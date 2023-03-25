import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import MyFoodList from "./components/MyFoodList/MyFoodList";
import CreateFoodPage from "./components/CreateFoodPage/CreateFoodPage";
import EditFoodPage from "./components/EditFoodPage/EditFoodPage";
import MyMealList from "./components/MyMealList/MyMealList";
import FoodDiary from "./components/FoodDiary/FoodDiary";
import RememberMeal from "./components/FoodDiary/RememberMeal"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/food/edit/:foodId">
            <EditFoodPage />
          </Route>
          <Route path="/food/mine">
            <MyFoodList />
          </Route>
          <Route path="/food/new">
            <CreateFoodPage />
          </Route>
          <Route path="/food/diary">
            <FoodDiary />
          </Route>
          <Route path="/meal/mine">
            <MyMealList />
          </Route>
          <Route path="/meal/new">
            <RememberMeal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
