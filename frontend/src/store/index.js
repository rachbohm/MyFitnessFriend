import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import foodReducer from "./foods";
import mealReducer from "./meals";
import diaryLogsReducer from "./diarylogs";
import mealFoodsReducer from "./mealFoods";

const rootReducer = combineReducers({
  session: sessionReducer,
  foodState: foodReducer,
  mealState: mealReducer,
  diaryLogState: diaryLogsReducer,
  mealFoodsState: mealFoodsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
