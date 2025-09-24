import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

function MovieCard({ movie }) {
  const { getImageUrl, addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();
  const { isAuthenticated } = useAuth();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="card h-100">
      <Link to={`/movie/${movie.id}`} className="text-decoration-none">
        <img 
          src={getImageUrl(movie.poster_path)}
          className="card-img-top"
          alt={movie.title}
          style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: '1rem' }}>
          {movie.title}
        </h5>
        <p className="card-text text-muted small">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="badge bg-primary">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
          <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-outline-primary">
            View Details
          </Link>
        </div>
        {isAuthenticated && (
          <button 
            className={`btn btn-sm mt-2 ${inWatchlist ? 'btn-success' : 'btn-outline-success'}`}
            onClick={handleWatchlistClick}
          >
            {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;