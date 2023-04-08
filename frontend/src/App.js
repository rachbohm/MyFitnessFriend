import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import MyFoodList from "./components/MyFoodList/MyFoodList";
import CreateFoodPage from "./components/CreateFoodPage/CreateFoodPage";
import EditFoodPage from "./components/EditFoodPage/EditFoodPage";
import MyMealList from "./components/Meals/MyMealList";
import FoodDiary from "./components/FoodDiary/FoodDiary";
import RememberMeal from "./components/FoodDiary/RememberMeal";
import EditMeal from "./components/Meals/EditMeal";
import NewLog from "./components/FoodDiary/NewLog";
import HomePage from "./components/HomePage/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/food/edit/:foodId">
            <ProtectedRoute>
              <EditFoodPage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/food/mine">
            <ProtectedRoute>
              <MyFoodList />
            </ProtectedRoute>
          </Route>
          <Route exact path="/food/new">
            <ProtectedRoute>
              <CreateFoodPage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/food/diary/new">
            <ProtectedRoute>
              <NewLog />
            </ProtectedRoute>
          </Route>
          <Route exact path="/food/diary">
            <ProtectedRoute>
              <FoodDiary />
            </ProtectedRoute>
          </Route>
          <Route exact path="/meal/edit/:mealId">
            <ProtectedRoute>
              <EditMeal />
            </ProtectedRoute>
          </Route>
          <Route exact path="/meal/mine">
            <ProtectedRoute>
              <MyMealList />
            </ProtectedRoute>
          </Route>
          <Route exact path="/meal/new">
            <ProtectedRoute>
              <RememberMeal />
            </ProtectedRoute>
          </Route>
          <Route path="">
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
