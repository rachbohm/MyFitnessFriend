import { csrfFetch } from "./csrf";

const LOAD_MEALS = "meals/LOAD_MEALS";

//ACTIONS
const loadMealsAction = (meals) => ({
  type: LOAD_MEALS,
  meals
})

//THUNKS
export const loadMyMealsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/meals/current')
  if (res.ok) {
    const meals = await res.json();
    dispatch(loadMealsAction(meals))
    return meals
  }
}

const initialState = {}
const mealReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_MEALS:
      newState = { ...state };
      action.meals.forEach((meal) => {
        newState[meal.id] = meal;
      })
      return newState;
    default:
      return state;
  }
}

export default mealReducer;
