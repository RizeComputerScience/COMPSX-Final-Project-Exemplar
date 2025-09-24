import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';

function AdminDashboard() {
  const { user } = useAuth();
  const { movies, fetchMovies } = useMovies();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMoviesViewed: 0,
    watchlistsCreated: 0
  });

  useEffect(() => {
    // Fetch some movies for stats
    fetchMovies('popular', 1);
    
    // Mock statistics - in production, these would come from your backend
    setStats({
      totalUsers: Math.floor(Math.random() * 1000) + 100,
      totalMoviesViewed: Math.floor(Math.random() * 10000) + 1000,
      watchlistsCreated: Math.floor(Math.random() * 500) + 50
    });
  }, []);

  // Mock user data for demonstration
  const mockUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', joined: '2024-01-15' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'user', joined: '2024-02-20' },
    { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'admin', joined: '2023-12-01' }
  ];

  return (
    <div className="container my-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <p className="text-muted">Welcome back, {user?.username}</p>
      
      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2 className="text-primary">{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Movies Viewed</h5>
              <h2 className="text-success">{stats.totalMoviesViewed}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Watchlists Created</h5>
              <h2 className="text-info">{stats.watchlistsCreated}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h4>User Management</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="card">
        <div className="card-header">
          <h4>Current Popular Movies</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Rating</th>
                  <th>Release Date</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {movies.slice(0, 5).map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>
                      <span className="badge bg-success">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                    </td>
                    <td>{movie.release_date}</td>
                    <td>{Math.floor(Math.random() * 10000)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;