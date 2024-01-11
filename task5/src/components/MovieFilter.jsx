import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const { Search } = Input;

const MovieFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = () => {
    const searchTermLowercase = searchTerm.toLowerCase();
  
    axios.get(`http://localhost:3001/movies`)
      .then(response => {
        const filteredMovies = response.data.filter(movie =>
          movie.title.toLowerCase().includes(searchTermLowercase)
        );
  
        setFilteredMovies(filteredMovies);
      })
      .catch(error => console.error('Error filtering movies:', error));
  };
  

  return (
    <div>
      <Search
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        enterButton={<Button onClick={handleSearch}>Search</Button>}
      />
<ul>
          {filteredMovies.map(movie => (
<Link to={`/movies/${movie.id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={movie.title} src={movie.posterUrl} />}
      >
        <Meta title={movie.title} />
      </Card>
    </Link>))}
    </ul>

     
    </div>
  );
};

export default MovieFilter;