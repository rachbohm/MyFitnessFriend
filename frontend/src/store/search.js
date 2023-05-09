import SearchBar from "../components/Search/SearchBar";
import { csrfFetch } from "./csrf";

const LOAD_SEARCH = "search/LOAD_SEARCH";

//ACTIONS
const loadSearchAction = (searchResults) => ({
  type: LOAD_SEARCH,
  searchResults,
});

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


const initialState = {};

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SEARCH:
      newState = {  }
      action.searchResults.forEach((food) => {
        newState[food.fdcId] = food
      })
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
