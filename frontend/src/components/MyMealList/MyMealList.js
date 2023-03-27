import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
import { loadMyMealsThunk } from '../../store/meals';
import './MyMealList.css';

const MyMealList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(null); // Use null to indicate no food item is selected

  const openDetails = (id) => {
    setShowDetails(id === showDetails ? null : id); // Toggle showDetails between the ID of the clicked item and null
  };

  useEffect(() => {
    dispatch(loadMyMealsThunk());
  }, [dispatch]);

  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  }

  return (
    <div className='meal-list-container'>
      <h2>Your Personal Meals</h2>
      {mealsArr.map((meal) => (
        <li key={meal.id}>
          <a href="#" onClick={() => openDetails(meal.id)}>{meal.mealName}</a>
        </li>
      ))}
      {showDetails && (
        <table className="meal-table">
          <thead>
            <tr>
              <th className='items-heading'>Items in This Meal</th>
              <th>Calories</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Protein</th>
              <th>Serving Size</th>
            </tr>
          </thead>
          <tbody>
            {mealsArr.find((meal) => meal.id === showDetails).Food.map((food) => {
              console.log('food', food)
              let quantity = 1;
              if (food.MealFood.quantity) {
                quantity = food.MealFood.quantity
              }
              let rows = [];
              for (let i = 0; i < quantity; i++) {
                rows.push(
                  <tr key={i}>
                    <td>{food.foodName}</td>
                    <td>{food.calories}</td>
                    <td>{food.carbohydrates}g</td>
                    <td>{food.fat}g</td>
                    <td>{food.protein}g</td>
                    <td>{food.servingSizeNum} {food.servingSizeUnit}</td>
                  </tr>
                );
              }
              return rows;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyMealList;
