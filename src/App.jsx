import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          No API key found. Please add VITE_TMDB_API_KEY to your .env file
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1" style={{ paddingTop: '70px' }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/watchlist" element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;