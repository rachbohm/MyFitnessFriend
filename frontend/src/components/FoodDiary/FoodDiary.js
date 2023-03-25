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

        return (
          <div key={diaryLog.id} className='diary-log-container'>
            <h3>{diaryLog.logName} {diaryLog.logDate.slice(0, 10)}</h3>
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
            <button className="remember-meal-button"
              onClick={() => history.push({
                pathname: '/meal/new',
                state: {diaryLog}
              })}>Remember Meal</button>
          </div>
        )
      })}
    </div>
  )
}


export default FoodDiary;
