import { csrfFetch } from "./csrf";

const LOAD_FOODS = "foods/LOAD_FOODS";

//ACTIONS
const loadFoodsAction = (foods) => ({
  type: LOAD_FOODS,
  foods
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
    default:
      return state;
  }
}

export default foodReducer;
