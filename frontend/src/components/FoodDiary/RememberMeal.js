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
  let rows = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mealName,
      foods: diaryLog.Food ? diaryLog.Food : diaryLog.Meals.Food,
      quantity: diaryLog.Food ? diaryLog.foodQuantity : diaryLog.mealQuantity
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
        {diaryLog.Food.forEach((food) => {
              for (let i = 0; i < food.DiaryLogFood.quantity; i++) {
                totalCalories += food.calories;
                totalCarbs += food.carbohydrates;
                totalFat += food.fat;
                totalProtein += food.protein;
                rows.push(
                  <tr key={`food-${food.id}-${food.DiaryLogFood.quantity}-${i}`}>
                    <td>food {food.foodName}</td>
                    <td>{food.calories}</td>
                    <td>{food.carbohydrates}</td>
                    <td>{food.fat}</td>
                    <td>{food.protein}</td>
                  </tr>
                )
              }
            })}
            {diaryLog.Meals.forEach((meal) => {
              for (let i = 0; i < meal.DiaryLogMeal.quantity; i++) {
                meal.Food.map((food) => {
                  for (let j = 0; j < food.MealFood.quantity; j++) {
                    totalCalories += food.calories;
                    totalCarbs += food.carbohydrates;
                    totalFat += food.fat;
                    totalProtein += food.protein;
                    rows.push(
                      <tr key={`meal-${meal.id}-food-${food.id}-i${i}-j${j}`}>
                        <td>meal {food.foodName}</td>
                        <td>{food.calories}</td>
                        <td>{food.carbohydrates}</td>
                        <td>{food.fat}</td>
                        <td>{food.protein}</td>
                      </tr>
                    );
                  }
                })
              }
            })}
            <table>
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Calories</th>
                  <th>Carbohydrates</th>
                  <th>Fat</th>
                  <th>Protein</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
              <tfoot>
                <tr className='total-row'>
                  <td>Total</td>
                  <td>{totalCalories}</td>
                  <td>{totalCarbs}</td>
                  <td>{totalFat}</td>
                  <td>{totalProtein}</td>
                </tr>
              </tfoot>
            </table>
        {/* {diaryLog.food && ( //if the entry is a food
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
          </table> */}
        {/* )
        } */}
      </div>
    </div>
  )
}

export default RememberMeal;
