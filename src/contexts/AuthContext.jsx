import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock JWT token decoder (in production, use a real JWT library)
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

// Mock token generator (for demo purposes)
const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now() / 1000,
    exp: (Date.now() / 1000) + (60 * 60 * 24) // 24 hour expiration
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp > Date.now() / 1000) {
        setUser(JSON.parse(savedUser));
      } else {
        // Token expired
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    
    try {
      // Mock authentication - in production, call your API
      // For demo, accept these credentials:
      const validUsers = {
        'admin@example.com': { 
          id: '1', 
          email: 'admin@example.com', 
          username: 'Admin User', 
          role: 'admin' 
        },
        'user@example.com': { 
          id: '2', 
          email: 'user@example.com', 
          username: 'Regular User', 
          role: 'user' 
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = validUsers[email];
      if (!user || password.length < 6) {
        throw new Error('Invalid email or password');
      }

      // Generate mock token
      const token = generateMockToken(user);
      
      // Store token in sessionStorage (more secure than localStorage)
      sessionStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Register function
  const register = async (email, password, username) => {
    setError(null);
    
    try {
      // Mock registration - in production, call your API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validate inputs
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        role: 'user' // Default role
      };

      const token = generateMockToken(newUser);
      
      sessionStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};