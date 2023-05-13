import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import './SearchBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadSearchResultsThunk, fetchNutritionInfoThunk } from '../../store/search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const searchResults = useSelector(state => state.searchState);
  const commonArr = searchResults && searchResults.common;
  const brandedArr = searchResults && searchResults.branded;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSubmitted(false);
  };

  const handleFoodClick = (item) => {
    dispatch(fetchNutritionInfoThunk(item.food_name)).then((result) => {
      setSelectedFood(result.foods[0])
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loadSearchResultsThunk(searchTerm)).then((result) => {
      setSubmitted(true)
      // console.log('after the dispatch', result);
      // Update state with search results
    }).catch((error) => {
      console.error(error);
    });
  }

  const isSearchTermEmpty = searchTerm.trim() === '';

  return (
    <>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit" className='search-bar-button' disabled={isSearchTermEmpty}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      {searchTerm && submitted && (
        <div className="search-results-container">
        {commonArr && (
          <div className="common-list">
            <h2>Common Foods</h2>
            <ul>
              {commonArr.map((item) => (
                <li key={`${item.tag_id}-${item.food_name}`}>

                  <a href="#" onClick={() => handleFoodClick(item)}>
                    {item.food_name}
                    <div>
                      <p>Serving Size: {item.serving_qty} {item.serving_unit}</p>
                      <img src={item.photo.thumb} alt={item.food_name} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {brandedArr && (
          <div className="branded-list">
            <h2>Branded Foods</h2>
            <ul>
              {brandedArr.map((item) => (
                <li key={`${item.tag_id}-${item.food_name}`}>
                  <a href="#" onClick={() => handleFoodClick(item)}>
                    {item.food_name}
                    <div>
                      <p>Serving Size: {item.serving_qty} {item.serving_unit}</p>
                      <img src={item.photo.thumb} alt={item.food_name} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
        )}
      {selectedFood && (
        <div className="food-card-container">
        <FoodCard item={selectedFood} onBack={() => setSelectedFood(null)} />
        </div>
        )}
    </>
  );
};

export default SearchBar;
