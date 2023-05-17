import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import './MealCard.css'

const MealCard = ({meal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalProtein = 0;

  useEffect(() => {
    dispatch(loadMealFoodsThunk(meal.id))
      .then(() =>  setIsLoaded(true) )
  }, [dispatch, meal]);

  const mealFoods = useSelector((state) => state.mealFoodsState);
  const mealFoodsArr = Object.values(mealFoods);

  return (
    isLoaded && (
      <div className='meal-card-container'>
        <h3>{meal.mealName}</h3>
        <button className="edit-meal-button" onClick={()=>history.push(`/meal/edit/${meal.id}`)}>Edit Meal</button>
        <table className="meal-table">
          <thead>
            <tr>
              <th className='items-heading'>Items in This Meal</th>
              <th>Calories</th>
              <th>Carbs (g)</th>
              <th>Fat (g)</th>
              <th>Protein (g)</th>
              <th>Serving Size</th>
            </tr>
          </thead>
          <tbody>
            {mealFoodsArr.map((food) => {
              totalCalories += parseFloat(food.calories);
              totalCarbs += parseFloat(food.carbohydrates);
              totalFat += parseFloat(food.fat);
              totalProtein += parseFloat(food.protein);
              let rows = [];

              rows.push(
                <tr key={food.id}>
                  <td>{food.foodName}</td>
                  <td>{food.calories}</td>
                  <td>{food.carbohydrates}</td>
                  <td>{food.fat}</td>
                  <td>{food.protein}</td>
                  <td>{food.servingSizeNum} {food.servingSizeUnit}</td>
                </tr>
              );
              return rows;
            })}
          </tbody>
          <tfoot>
            <tr className='total-row'>
              <td>Total</td>
              <td>{totalCalories.toFixed(2)}</td>
                <td>{totalCarbs.toFixed(2)}</td>
                <td>{totalFat.toFixed(2)}</td>
                <td>{totalProtein.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    )
  );
};

export default MealCard;
