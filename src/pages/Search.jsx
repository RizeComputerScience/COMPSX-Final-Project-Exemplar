import React, { useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Search() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const { searchResults, loading, searchMovies } = useMovies();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearched(true);
    await searchMovies(query);
  };

  const handleClear = () => {
    setQuery('');
    setSearched(false);
    searchMovies(''); // Clear results
  };

  const handleSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSearched(false);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Search Movies</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              {query && (
                <button 
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClear}
                >
                  Clear
                </button>
              )}
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={!query.trim() || loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            {/* Search Suggestions */}
            <div className="mt-2">
              <small className="text-muted">
                Try searching for: 
                {[' Avengers', ' Star Wars', ' Harry Potter', ' Batman'].map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-link btn-sm text-muted text-decoration-none"
                    onClick={() => handleSuggestion(suggestion.trim())}
                  >
                    {suggestion}
                    {index < 3 && ','}
                  </button>
                ))}
              </small>
            </div>
          </div>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Searching...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && searched && (
        <>
          {searchResults.length > 0 ? (
            <>
              <h4 className="mb-3">
                Found {searchResults.length} results for "{query}"
              </h4>
              <div className="row">
                {searchResults.map(movie => (
                  <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="alert alert-info">
              <h4>No results found</h4>
              <p>No movies found for "{query}". Try a different search term.</p>
            </div>
          )}
        </>
      )}

      {/* Initial State */}
      {!searched && !loading && (
        <div className="text-center py-5">
          <h3 className="text-muted">Start searching for movies</h3>
          <p className="text-muted">
            Enter a movie title, actor name, or keyword to find movies
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;