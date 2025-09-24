import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentMovie, 
    loading, 
    error, 
    fetchMovieDetails, 
    getImageUrl,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist 
  } = useMovies();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isInWatchlist(currentMovie.id)) {
      removeFromWatchlist(currentMovie.id);
    } else {
      addToWatchlist(currentMovie);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !currentMovie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error || 'Movie not found'}
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row">
        {/* Movie Poster */}
        <div className="col-md-4">
          <img 
            src={getImageUrl(currentMovie.poster_path)}
            alt={currentMovie.title}
            className="img-fluid rounded shadow"
          />
          
          {/* Watchlist Button */}
          <div className="d-grid gap-2 mt-3">
            <button 
              className={`btn ${isInWatchlist(currentMovie.id) ? 'btn-success' : 'btn-outline-success'}`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist(currentMovie.id) 
                ? '✓ In Watchlist' 
                : isAuthenticated 
                  ? '+ Add to Watchlist'
                  : 'Login to Add to Watchlist'}
            </button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="col-md-8">
          <h1 className="mb-3">
            {currentMovie.title} 
            {currentMovie.release_date && (
              <small className="text-muted ms-2">
                ({new Date(currentMovie.release_date).getFullYear()})
              </small>
            )}
          </h1>

          <div className="mb-3">
            <span className="badge bg-primary me-2">
              ⭐ {currentMovie.vote_average?.toFixed(1)}/10
            </span>
            {currentMovie.runtime && (
              <span className="badge bg-secondary me-2">
                {currentMovie.runtime} min
              </span>
            )}
            {currentMovie.genres?.map(genre => (
              <span key={genre.id} className="badge bg-info me-2">
                {genre.name}
              </span>
            ))}
          </div>

          {currentMovie.tagline && (
            <p className="lead text-muted fst-italic">"{currentMovie.tagline}"</p>
          )}

          <h4>Overview</h4>
          <p>{currentMovie.overview || 'No overview available.'}</p>

          <div className="row mt-4">
            <div className="col-sm-6">
              <p><strong>Release Date:</strong> {currentMovie.release_date || 'N/A'}</p>
              <p><strong>Original Language:</strong> {currentMovie.original_language?.toUpperCase()}</p>
            </div>
            <div className="col-sm-6">
              {currentMovie.budget > 0 && (
                <p><strong>Budget:</strong> ${currentMovie.budget.toLocaleString()}</p>
              )}
              {currentMovie.revenue > 0 && (
                <p><strong>Revenue:</strong> ${currentMovie.revenue.toLocaleString()}</p>
              )}
            </div>
          </div>

          {/* Cast */}
          {currentMovie.cast && currentMovie.cast.length > 0 && (
            <div className="mt-4">
              <h4>Cast</h4>
              <div className="row">
                {currentMovie.cast.map(actor => (
                  <div key={actor.id} className="col-6 col-md-4 mb-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={getImageUrl(actor.profile_path)}
                        alt={actor.name}
                        className="rounded-circle me-2"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          objectFit: 'cover' 
                        }}
                      />
                      <div>
                        <strong className="d-block small">{actor.name}</strong>
                        <small className="text-muted">{actor.character}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;