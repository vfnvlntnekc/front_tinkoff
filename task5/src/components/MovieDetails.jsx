import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/${id}`);
        const data = await response.json();
        console.log('Movie data:', data);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
  
    fetchMovie();
  }, [id]);

  const showModal = () => {
    setIsEditModalVisible(true);
  };

  const handleFavoriteToggle = async () => {
    try {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      if (!isFavorite) {
        await axios.post(`http://localhost:3001/favorites`, { id: id });
      } else {
        await axios.delete(`http://localhost:3001/favorites/${id}`);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Card
  title={movie.title}
  bodyStyle={{ display: 'flex' }}
>
  <div style={{ width: '15%', overflow: 'hidden' }}>
    <img alt={movie.title} src={movie.posterUrl} style={{ width: '100%', height: 'auto', marginLeft: '16px' }} />
  </div>
  <div style={{ flex: 1, marginLeft: '16px' }}>
    <p>{movie.plot}</p>
    <p>
      <strong>Director:</strong> {movie.director}
    </p>
    <p>
      <strong>Year:</strong> {movie.year}
    </p>
    <p>
      <strong>Runtime:</strong> {movie.runtime} minutes
    </p>
    <p>
      <strong>Genres:</strong> {movie.genres.join(', ')}
    </p>
    <p>
      <strong>Actors:</strong> {movie.actors}
    </p>
    <Button onClick={handleFavoriteToggle}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
    <Link to={`/movies/${movie.id}/edit`}>
      <Button>Edit Movie</Button>
    </Link>
  </div>
</Card>

  );
};

export default MovieDetails;
