import React, { createContext, useState, useContext, useCallback } from 'react';

const MovieContext = createContext(null);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieProvider = ({ children }) => {
  // State for movies
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('popular');

  // Fetch movies by category
  const fetchMovies = useCallback(async (categoryParam = 'popular', page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${categoryParam}?api_key=${API_KEY}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      setMovies(data.results || []);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      setCategory(categoryParam);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search movies
  const searchMovies = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get movie details
  const fetchMovieDetails = useCallback(async (movieId) => {
    setLoading(true);
    setError(null);
    
    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
      ]);

      if (!movieResponse.ok) {
        throw new Error('Movie not found');
      }

      const movieData = await movieResponse.json();
      const creditsData = await creditsResponse.json();

      const movieWithCredits = {
        ...movieData,
        cast: creditsData.cast?.slice(0, 6) || []
      };
      
      setCurrentMovie(movieWithCredits);
      return movieWithCredits;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movie details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Watchlist functions
  const addToWatchlist = useCallback((movie) => {
    setWatchlist(prev => {
      const exists = prev.some(m => m.id === movie.id);
      if (!exists) {
        const updated = [...prev, movie];
        localStorage.setItem('watchlist', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist(prev => {
      const updated = prev.filter(movie => movie.id !== movieId);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback((movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  }, [watchlist]);

  // Helper function to get image URLs
  const getImageUrl = (path) => {
    return path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
  };

  const value = {
    // State
    movies,
    searchResults,
    currentMovie,
    watchlist,
    loading,
    error,
    currentPage,
    totalPages,
    category,
    
    // Actions
    fetchMovies,
    searchMovies,
    fetchMovieDetails,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    setCategory,
    setCurrentPage,
    
    // Helpers
    getImageUrl,
    API_KEY
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the MovieContext
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};