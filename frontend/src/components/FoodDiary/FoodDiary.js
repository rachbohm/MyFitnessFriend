import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadDiaryLogsThunk } from '../../store/diarylogs';
import './FoodDiary.css';

const FoodDiary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadDiaryLogsThunk())
      .then(() => { setIsLoaded(true) })
  }, [dispatch]);

  const diaryLogs = useSelector((state) => state.diaryLogState);
  const diaryLogsArr = Object.values(diaryLogs);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  };

  return isLoaded && (
    <div>
      {diaryLogsArr.map((diaryLog) => {
        let totalCalories = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalProtein = 0;
        const rows = [];

        return (
          <div key={diaryLog.id} className='diary-log-container'>
            <h3>{diaryLog.logName} {diaryLog.logDate.slice(0, 10)}</h3>

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
            <button className="remember-meal-button"
              onClick={() => history.push({
                pathname: '/meal/new',
                state: { diaryLog }
              })}>Remember Meal</button>
          </div>
        )
      })}
    </div>
  )
}


export default FoodDiary;
