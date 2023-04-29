import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import SplashPage from "./components/HomePage/SplashPage";
import AddLog from "./components/FoodDiary/AddLog";
import AddMealLog from "./components/FoodDiary/AddMealLog";
import NewMealLog from "./components/FoodDiary/NewMealLog";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
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
          <Route exact path="/food/diary/:diaryLogId/add">
            <ProtectedRoute>
              <AddLog />
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
          <Route exact path="/meal/diary/new">
            <ProtectedRoute>
              <NewMealLog />
            </ProtectedRoute>
          </Route>
          <Route exact path="/meal/diary/:diaryLogId/add">
            <ProtectedRoute>
              <AddMealLog />
            </ProtectedRoute>
          </Route>
          <Route exact path="/">
            {sessionUser ? <HomePage /> : <SplashPage />}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
