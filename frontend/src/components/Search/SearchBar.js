import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import './SearchBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadSearchResultsThunk } from '../../store/search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  const searchResults = useSelector(state => state.searchState);
  const searchResultsArr = Object.values(searchResults);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handleSubmit')
    dispatch(loadSearchResultsThunk(searchTerm)).then((result) => {
      // console.log('after the dispatch', result);
      // Update state with search results
    }).catch((error) => {
      console.error(error);
    });
  }


  return (
    <>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit" className='search-bar-button'>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className='search-left-right'>
        <div className="search-results-container">
          {searchResultsArr.map((item) => (
            <li key={item.fdcId}>
              <a href="#" onClick={() => handleFoodClick(item)}>
                {item.description}
              </a>
            </li>
          ))}
        </div>

        {selectedFood && (
          <div className="food-card-container">
            <FoodCard item={selectedFood} />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
