import SearchBar from "../components/Search/SearchBar";
import { csrfFetch } from "./csrf";

const LOAD_SEARCH = "search/LOAD_SEARCH";
const LOAD_NUTRITION = "search/LOAD_NUTRITION";

//ACTIONS
const loadSearchAction = (searchResults) => ({
  type: LOAD_SEARCH,
  searchResults,
});

const loadNutritionAction = (nutritionInfo) => ({
  type: LOAD_NUTRITION,
  nutritionInfo
})

//THUNKS
export const loadSearchResultsThunk = (searchTerm) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/search/${searchTerm}`);
    if (res.ok) {
      const searchResults = await res.json();
      dispatch(loadSearchAction(searchResults));
      return searchResults;
    }
    throw res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchNutritionInfoThunk = (food_name) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/search/common/${food_name}`);
    if (res.ok) {
      const nutritionInfo = await res.json();
      dispatch(loadNutritionAction(nutritionInfo));
      return nutritionInfo;
    }
    throw res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const initialState = {};

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SEARCH:
      newState = action.searchResults
      // console.log('action', action)
      return newState;
    case LOAD_NUTRITION:
      newState = {...state}
      console.log('action', action)
      newState.nutrition = action.nutritionInfo.foods
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
