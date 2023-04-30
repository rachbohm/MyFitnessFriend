import React, { useState } from 'react';
import FoodCard from './FoodCard';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    console.log('selectedFood', selectedFood)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?&api_key=eZ1TOC3jqLgozDmGlFWCjPz0Gc0sy41bzPfmr77e&query=${searchTerm}`);
      const data = await response.json();
      const filteredResults = data.foods.filter((item) => item.foodNutrients.length > 0);
      setSearchResults(filteredResults.map((item) => {
        return (
          <li key={item.fdcId}>
            <a href="#" onClick={() => handleFoodClick(item)}>
              {item.description}
            </a>
          </li>
        );
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
      <div className='search-left-right'>
        <div className="search-results-container">
          {searchResults}
        </div>
        {selectedFood && (
          <div className="food-card-container">
            <FoodCard item={selectedFood} />
          </div>
        )}
      </div>
    </form>
  );

};

export default SearchBar;
