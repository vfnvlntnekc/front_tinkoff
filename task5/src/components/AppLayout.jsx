import React, { useState } from 'react';
import MovieFilter from './MovieFilter';
import MovieList from './MovieList';

const AppLayout = () => {
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleFilter = (movies) => {
      setFilteredMovies(movies);
    };

    return (
      <div style={{ display: 'flex', paddingTop: '100px' }}>
        <div style={{ flex: 1, paddingRight: '20px', paddingLeft: '20px' }}>
          <MovieFilter onFilter={handleFilter} />
      </div>
        
        <div style={{ flex: 2, paddingRight: '20px', paddingLeft: '20px'}}>
        </div>
      </div>
    );
};

export default AppLayout;
