import { csrfFetch } from "./csrf";

const LOAD_FOODS = "foods/LOAD_FOODS";
const CLEAR_FOODS = "foods/CLEAR_FOODS";

//ACTIONS
const loadFoodsAction = (foods) => ({
  type: LOAD_FOODS,
  foods
});

const clearFoodsAction = () => ({
  type: CLEAR_FOODS,
});


//THUNKS
export const loadMyFoodsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/foods/current')
  if (res.ok) {
    const foods = await res.json();
    dispatch(loadFoodsAction(foods))
    return foods
  }
}
export const logoutThunk = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(clearFoodsAction());
  return response;
};

const initialState = {}
const foodReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_FOODS:
      newState = { ...state };
      action.foods.forEach((food) => {
        newState[food.id] = food;
      })
      return newState;
    case CLEAR_FOODS:
      return {};
    default:
      return state;
  }
}

export default foodReducer;
