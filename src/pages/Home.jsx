import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

function Home() {
  const { movies, loading, fetchMovies } = useMovies();
  const { user } = useAuth();

  useEffect(() => {
    fetchMovies('popular', 1);
  }, [fetchMovies]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">
                Welcome to MovieHub
              </h1>
              <p className="lead">
                {user 
                  ? `Welcome back, ${user.username}! Discover your next favorite movie.`
                  : 'Discover millions of movies. Explore now.'}
              </p>
              <div className="mt-4">
                <Link to="/movies" className="btn btn-light btn-lg me-3">
                  Browse Movies
                </Link>
                <Link to="/search" className="btn btn-outline-light btn-lg">
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Popular Movies</h2>
          <Link to="/movies" className="btn btn-outline-primary">
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {movies.slice(0, 8).map(movie => (
              <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!user && (
        <div className="container mb-5">
          <div className="text-center py-5 bg-light rounded">
            <h3>Join MovieHub Today</h3>
            <p className="text-muted">Create an account to build your watchlist!</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Sign Up For Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;