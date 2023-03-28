import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMealThunk } from '../../store/meals';


const RememberMeal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { diaryLog } = location.state;
  const [mealName, setMealName] = useState('');
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalProtein = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mealName,
      foods: diaryLog.food ? diaryLog.food : diaryLog.meal.Food,
      quantity: diaryLog.food ? diaryLog.foodQuantity : diaryLog.mealQuantity
    };
    
    dispatch(createMealThunk(payload))
      .then(() => {
        history.push('/meal/mine')
      })
  }

  return (
    <div>

      <form className="create-meal-form" onSubmit={handleSubmit}>
        <label>Name this meal </label>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div key={diaryLog.id} className='diary-log-container'>
        <h3>Items in this Meal</h3>
        {diaryLog.food && ( //if the entry is a food
          <table>
            <tbody>
              <tr>
                <th>Food Name</th>
                <th>Calories</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Protein (g)</th>
              </tr>
              {[...Array(diaryLog.foodQuantity)].map((_, index) => { //new row for each 1 quantity
                const food = diaryLog.food;
                totalCalories += food.calories;
                totalCarbs += food.carbohydrates;
                totalFat += food.fat;
                totalProtein += food.protein;
                return (
                  <tr key={index}>
                    <td>{food.foodName}</td>
                    <td>{food.calories}</td>
                    <td>{food.carbohydrates}</td>
                    <td>{food.fat}</td>
                    <td>{food.protein}</td>
                  </tr>
                );
              })}
              <tr className="total-row">
                <td>Total</td>
                <td>{totalCalories}</td>
                <td>{totalCarbs}</td>
                <td>{totalFat}</td>
                <td>{totalProtein}</td>
              </tr>
            </tbody>
          </table>
        )}
        {diaryLog.meal && ( //if it is a meal
          <table>
            <tbody>
              <tr>
                <th>Food Name</th>
                <th>Calories</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Protein (g)</th>
              </tr>

              {diaryLog.meal.Food.map((food) => (
                [...Array(diaryLog.mealQuantity)].map((_, index) => { //new row for each 1 quantity
                  totalCalories += food.calories;
                  totalCarbs += food.carbohydrates;
                  totalFat += food.fat;
                  totalProtein += food.protein;
                  return (
                    <tr key={`${food.id}-${index}`}>
                      <td>{food.foodName}</td>
                      <td>{food.calories}</td>
                      <td>{food.carbohydrates}</td>
                      <td>{food.fat}</td>
                      <td>{food.protein}</td>
                    </tr>
                  )
                })
              )
              )}
              <tr className='total-row'>
                <td>Total</td>
                <td>{totalCalories}</td>
                <td>{totalCarbs}</td>
                <td>{totalFat}</td>
                <td>{totalProtein}</td>
              </tr>
            </tbody>
          </table>
        )
        }
      </div>
    </div>
  )
}

export default RememberMeal;
