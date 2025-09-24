import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';

function Navigation() {
  const { user, logout, isAdmin } = useAuth();
  const { watchlist } = useMovies();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🎬 MovieHub
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/search"
              >
                Search
              </NavLink>
            </li>
            
            {user && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  } 
                  to="/watchlist"
                >
                  Watchlist ({watchlist.length})
                </NavLink>
              </li>
            )}
            
            {isAdmin && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  } 
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
            )}
            
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hello, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      isActive ? "nav-link active" : "nav-link"
                    } 
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      isActive ? "nav-link active" : "nav-link"
                    } 
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;