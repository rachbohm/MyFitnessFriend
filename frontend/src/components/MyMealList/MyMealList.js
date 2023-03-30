import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
import { loadMyMealsThunk } from '../../store/meals';
import './MyMealList.css';
import MealCard from './MealCard';

const MyMealList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadMyMealsThunk());
  }, [dispatch]);

  const [selectedMeal, setSelectedMeal] = useState(null);

  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  }

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="meal-list-container">
      <div>
        <h2>Your Personal Meals</h2>
        <div className="meal-list">
          {mealsArr.map((meal) => (
            <li key={meal.id}>
              <a href="#" onClick={() => handleMealClick(meal)}>
                {meal.mealName}
              </a>
            </li>
          ))}
        </div>
      </div>
      <div className="meal-card-container">
        {selectedMeal && <MealCard meal={selectedMeal} />}
      </div>
    </div>
  );

};

export default MyMealList;
