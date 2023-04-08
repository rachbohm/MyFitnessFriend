import { csrfFetch } from "./csrf";

const LOAD_MEAL_FOODS = "mealFoods/LOAD_MEAL_FOODS";

//ACTIONS
const loadMealFoodsAction = (mealFoods) => ({
  type: LOAD_MEAL_FOODS,
  mealFoods
})

//THUNKS
export const loadMealFoodsThunk = (id) => async dispatch => {
  const res = await csrfFetch(`/api/meals/${id}`);

  if (res.ok) {
    const mealFoods = await res.json();
    return dispatch(loadMealFoodsAction(mealFoods))
  };
  return res;
}

const initialState = {}
const mealFoodsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_MEAL_FOODS:
      newState = {  };
      action.mealFoods.forEach((instance, index) => {
        newState[index] = instance
      })
      return newState;
    default:
      return state;
  }
}

export default mealFoodsReducer;
