import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadDiaryLogsThunk } from '../../store/diarylogs';
import './FoodDiary.css'

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
  }

  return isLoaded && (
    <div>
      {diaryLogsArr.map((diaryLog) => {
        return (
          <div key={diaryLog.id} className='diary-log-container'>
            <h3>{diaryLog.logName}</h3>
            {diaryLog.food && (
              <table>
                <tbody>
                  <tr>
                    <th>Food Name</th>
                    <th>Calories</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                    <th>Protein (g)</th>
                  </tr>
                  {[...Array(diaryLog.foodQuantity)].map((_, index) => (
                    <tr key={index}>
                      <td>{diaryLog.food.foodName}</td>
                      <td>{diaryLog.food.calories}</td>
                      <td>{diaryLog.food.carbohydrates}</td>
                      <td>{diaryLog.food.fat}</td>
                      <td>{diaryLog.food.protein}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {diaryLog.meal && (
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
                    [...Array(diaryLog.mealQuantity)].map((_, index) => (
                      <tr key={`${food.id}-${index}`}>
                        <td>{food.foodName}</td>
                        <td>{food.calories}</td>
                        <td>{food.carbohydrates}</td>
                        <td>{food.fat}</td>
                        <td>{food.protein}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FoodDiary;
