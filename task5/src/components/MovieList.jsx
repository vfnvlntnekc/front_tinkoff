import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Button, Card } from 'antd';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    
    <div className="movie-list">
      <Link to="/movies/new">
      <Button type="primary" style={{ marginTop: '16px' }}>
        Add New Movie
      </Button>
    </Link>
    {movies.map((movie, index) => (
      <div key={movie.id} style={{ marginTop: index < movies.length - 1 ? '16px' : 0 }}>
        <MovieCard movie={movie} />
      </div>
    ))}
    
  </div>
  );
};

export default MovieList;
