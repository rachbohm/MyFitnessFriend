import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
import { loadMyMealsThunk } from '../../store/meals';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { editDiaryLogThunk, editDiaryLogMealThunk } from '../../store/diarylogs';
import MealCard from '../Meals/MealCard';
import './AddMealLog.css';

const AddMealLog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { diaryLog } = location.state;
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});

  useEffect(() => {
    dispatch(loadMyMealsThunk())
      .then(() => {
        setIsLoaded(true)
      })
  }, [dispatch, diaryLog]);


  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);

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
      await dispatch(editDiaryLogMealThunk({ diaryLog, meal: selectedMeal.id }))
        .then(() => {
          history.push({
            pathname: '/food/diary',
            state: { diaryLog }
          });
        });
    }
  };

  return isLoaded && (
    <div className="new-diary-log-food-container">
      <h2>Add Meal To {diaryLog.logName} on {diaryLog.logDate.slice(0, 10)}</h2>
      <div className='left-right-meal'>
        <form onSubmit={handleSubmit}>
          {mealsArr.map((meal) => (
            <div key={meal.id}>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value={meal.id}
                  onChange={(event) => setSelectedMeal(meal)}
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

export default AddMealLog;
