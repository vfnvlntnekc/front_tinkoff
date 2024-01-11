import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';

const { Search } = Input;

const MovieFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Button clicked');
    axios.get(`http://localhost:3001/movies?title_like=${searchTerm}`)
      .then(response => onFilter(response.data))
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
    </div>
  );
};

export default MovieFilter;

