import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={movie.title} src={movie.posterUrl} />}
      >
        <Meta title={movie.title} />
      </Card>
    </Link>
  );
};

export default MovieCard;
