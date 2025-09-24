import React, { useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Movies() {
  const { 
    movies, 
    loading, 
    category, 
    currentPage, 
    totalPages,
    fetchMovies,
    setCategory,
    setCurrentPage 
  } = useMovies();

  useEffect(() => {
    fetchMovies(category, currentPage);
  }, [category, currentPage, fetchMovies]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Movies</h1>
      
      {/* Category Filter */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={`btn ${category === 'popular' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryChange('popular')}
        >
          Popular
        </button>
        <button 
          className={`btn ${category === 'top_rated' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryChange('top_rated')}
        >
          Top Rated
        </button>
        <button 
          className={`btn ${category === 'now_playing' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryChange('now_playing')}
        >
          Now Playing
        </button>
        <button 
          className={`btn ${category === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryChange('upcoming')}
        >
          Upcoming
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {movies.map(movie => (
              <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">
                    Page {currentPage} of {Math.min(totalPages, 500)}
                  </span>
                </li>
                <li className={`page-item ${currentPage >= Math.min(totalPages, 500) ? 'disabled' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default Movies;