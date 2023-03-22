import { csrfFetch } from "./csrf";

const LOAD_FOODS = "foods/LOAD_FOODS";
const CLEAR_FOODS = "foods/CLEAR_FOODS";
const ADD_FOOD = "foods/ADD_FOOD";
const UPDATE_FOOD = "foods/UPDATE_FOOD";
const REMOVE_FOOD = "foods/REMOVE_FOOD";

//ACTIONS
const loadFoodsAction = (foods) => ({
  type: LOAD_FOODS,
  foods
});

const clearFoodsAction = () => ({
  type: CLEAR_FOODS,
});

const addFoodAction = (food) => ({
  type: ADD_FOOD,
  food
});

const updateFoodAction = (food) => ({
  type: UPDATE_FOOD,
  food
});

const removeFoodAction = (foodId) => ({
  type: REMOVE_FOOD,
  foodId
})

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

export const createFoodThunk = (payload) => async (dispatch) => {

  const res = await csrfFetch('/api/foods', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(addFoodAction(food));
    return food;
  }
  return res;
};

export const editFoodThunk = (payload, id) => async (dispatch) => {

  const res = await csrfFetch(`/api/foods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(updateFoodAction(food))
  }
};

export const deleteFoodThunk = (foodId) => async dispatch => {
  const res = await csrfFetch(`/api/foods/${foodId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeFoodAction(foodId))
  }
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
    case ADD_FOOD:
      newState = { ...state };
      newState[action.food.id] = action.food;
      return newState;
    case UPDATE_FOOD:
      newState = { ...state }
      newState[action.food.id] = action.food;
      return newState;
    case REMOVE_FOOD:
      newState = { ...state }
      delete newState[action.foodId];
      return newState;
    default:
      return state;
  }
}

export default foodReducer;
