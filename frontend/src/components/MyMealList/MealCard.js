import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import './MealCard.css'

const MealCard = ({meal}) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
            {mealFoodsArr.map((food) => {
              let rows = [];

              rows.push(
                <tr key={food.id}>
                  <td>{food.foodName}</td>
                  <td>{food.calories}</td>
                  <td>{food.carbohydrates}g</td>
                  <td>{food.fat}g</td>
                  <td>{food.protein}g</td>
                  <td>{food.servingSizeNum} {food.servingSizeUnit}</td>
                </tr>
              );
              return rows;
            })}
          </tbody>
        </table>
      </div>

    )
  );
};

export default MealCard;
