import { csrfFetch } from "./csrf";

const LOAD_MEALS = "meals/LOAD_MEALS";
const ADD_MEAL = "meals/ADD_MEAL";
const UPDATE_MEAL = "meals/UPDATE_MEAL";
const REMOVE_MEAL = "meals/REMOVE_MEAL";

//ACTIONS
const loadMealsAction = (meals) => ({
  type: LOAD_MEALS,
  meals
});

const addMealAction = (meal) => ({
  type: ADD_MEAL,
  meal
});

const updateMealAction = (meal) => ({
  type: UPDATE_MEAL,
  meal
});

const removeMealAction = (mealId) => ({
  type: REMOVE_MEAL,
  mealId
})

//THUNKS
export const loadMyMealsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/meals/current')
  if (res.ok) {
    const meals = await res.json();
    dispatch(loadMealsAction(meals));
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
};

export const editMealThunk = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/meals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const meal = await res.json();
    dispatch(updateMealAction(meal))
  }
};

export const removeFoodFromMealThunk = (mealId, foodId) => async (dispatch) => {
  const res = await csrfFetch(`/api/meals/${mealId}/foods/${foodId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const meal = await res.json();
    dispatch(updateMealAction(meal))
  }
};

export const removeMealThunk = (mealId) => async dispatch => {
  const res = await csrfFetch(`/api/meals/${mealId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeMealAction(mealId))
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
    case ADD_MEAL:
      newState = { ...state };
      newState[action.meal.id] = action.meal;
      return newState;
    case UPDATE_MEAL:
      newState = { ...state }
      newState[action.meal.id] = action.meal;
      return newState;
    case REMOVE_MEAL:
      newState = { ...state }
      delete newState[action.mealId];
      return newState;
    default:
      return state;
  }
}

export default mealReducer;
