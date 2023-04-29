import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?&api_key=eZ1TOC3jqLgozDmGlFWCjPz0Gc0sy41bzPfmr77e&query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.foods.map((item) => {
        return <div key={item.fdcId}>{item.description}</div>
      }));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
      <button type="submit" className='search-bar-button'>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      {searchResults}
    </form>
  )
};

export default SearchBar;
