import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyMealsThunk } from '../../store/meals';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { newDiaryLogThunk, editDiaryLogMealThunk } from '../../store/diarylogs';
import MealCard from '../Meals/MealCard';
import './AddMealLog.css';

const NewMealLog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { logName, logDate } = location.state;
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});

  useEffect(() => {
    dispatch(loadMyMealsThunk())
      .then(() => {
        setIsLoaded(true)
      })
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(selectedMeal).length > 0) {
      dispatch(loadMealFoodsThunk(selectedMeal.id));
    }
  }, [dispatch, selectedMeal]);

  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);
  let mealFoods = useSelector((state) => state.mealFoodsState);
  let mealFoodsArr = Object.values(mealFoods);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(selectedMeal).length === 0) {
      setErrors(['Please select a meal']);
      return;
    }

    if (window.confirm('Please confirm form submission')) {
      await dispatch(newDiaryLogThunk({logName, logDate, foods: mealFoodsArr}))
        .then(() => {
          history.push({
            pathname: '/food/diary',
            state: { logDate: logDate }
          });
        });
    }
  };

  return isLoaded && (
    <div className="new-diary-log-food-container">
      <h2>Add Meal To {logName} on {logDate.toISOString().slice(0, 10)}</h2>
      <div className='left-right-meal'>
        <form onSubmit={handleSubmit}>
          {mealsArr.map((meal) => (
            <div key={meal.id}>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value={meal.id}
                  onChange={() => {
                    setSelectedMeal(meal);
                  }}
                />
                {meal.mealName}
              </label>
            </div>
          ))}
          <button type="submit" disabled={Object.keys(selectedMeal).length === 0}>Add Selected Meal</button>
        </form>
        {Object.keys(selectedMeal).length > 0 && (
          <div className="food-diary-meal-card-container">
            <MealCard meal={selectedMeal} />
          </div>
        )}
      </div>
    </div>
  );

};

export default NewMealLog;
