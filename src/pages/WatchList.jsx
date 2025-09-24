import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const { watchlist } = useMovies();

  return (
    <div className="container my-4">
      <h1 className="mb-4">My Watchlist</h1>
      
      {watchlist.length === 0 ? (
        <div className="alert alert-info">
          <h4>Your watchlist is empty</h4>
          <p>Start adding movies to your watchlist to keep track of what you want to watch!</p>
          <Link to="/movies" className="btn btn-primary">
            Browse Movies
          </Link>
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">
            You have {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in your watchlist
          </p>
          
          <div className="row">
            {watchlist.map(movie => (
              <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Watchlist;