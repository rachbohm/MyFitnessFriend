import { csrfFetch } from "./csrf";

const LOAD_MEALS = "meals/LOAD_MEALS";
const ADD_MEAL = "meals/ADD_MEAL";

//ACTIONS
const loadMealsAction = (meals) => ({
  type: LOAD_MEALS,
  meals
});

const addMealAction = (meal) => ({
  type: ADD_MEAL,
  meal
})

//THUNKS
export const loadMyMealsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/meals/current')
  if (res.ok) {
    const meals = await res.json();
    dispatch(loadMealsAction(meals))
    return meals
  }
};

export const createMealThunk = (payload) => async (dispatch) => {

  const res = await csrfFetch('/api/meals', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const meal = await res.json();
    dispatch(addMealAction(meal));
    return meal;
  }
  return res;
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
    case ADD_MEAL:
      newState = { ...state };
      newState[action.meal.id] = action.meal;
      return newState;
    default:
      return state;
  }
}

export default mealReducer;
