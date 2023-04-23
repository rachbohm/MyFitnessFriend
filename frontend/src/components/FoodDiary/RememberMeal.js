import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMealThunk } from '../../store/meals';
import './RememberMeal.css';



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
      foods: diaryLog.Food,
      meals: diaryLog.Meals
    };

    dispatch(createMealThunk(payload))
      .then(() => {
        history.push('/meal/mine')
      })
  }

  return (
    <div className="create-meal-container">

      <form className="create-meal-form" onSubmit={handleSubmit}>
        <label>Remembering Meal From {diaryLog.logName} on {diaryLog.logDate.slice(0, 10)}  </label>
        <div className="input-and-button">
          <input className="text-box"
            type="text"
            value={mealName}
            placeholder="Enter name here"
            onChange={(e) => setMealName(e.target.value)}
            required
          />
          <button type="submit" className="submit-edit-button">Submit</button>
        </div>
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
      </div>
    </div>
  )
}

export default RememberMeal;
