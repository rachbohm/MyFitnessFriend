import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadDiaryLogsThunk, removeFoodFromDiaryLogThunk } from '../../store/diarylogs';
import './FoodDiary.css';

const FoodDiary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { logDate = new Date() } = location.state || {};
  const [edited, setEdited] = useState(false);

  const [selectedDate, setSelectedDate] = useState(logDate ? logDate : new Date());

  useEffect(() => {
    dispatch(loadDiaryLogsThunk())
      .then(() => { setIsLoaded(true) })
  }, [dispatch]);

  const diaryLogs = useSelector((state) => state.diaryLogState);
  const diaryLogsArr = Object.values(diaryLogs).filter(diaryLog => new Date(diaryLog.logDate).toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10));

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  };

  const logNames = ["Breakfast", "Lunch", "Dinner"];

  const handleRemoveFood = async (e, foodId, foodName, logName, diaryLogId) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to remove ${foodName} from ${logName}?`)) {
      dispatch(removeFoodFromDiaryLogThunk(diaryLogId, foodId))
        .then(() => {
          setEdited(true);
          dispatch(loadDiaryLogsThunk());
        })
    }
  }

  const diaryLogsToRender = logNames.map((logName) => {
    const diaryLog = diaryLogsArr.find((log) => log.logName === logName);
    if (diaryLog) {
      let totalCalories = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      let totalProtein = 0;
      const rows = [];
      return isLoaded && (
        <div key={diaryLog.id} className='diary-log-container'>
          <h3>{diaryLog.logName}</h3>
          {diaryLog.Food.forEach((food) => {
            for (let i = 0; i < food.DiaryLogFood.quantity; i++) {
              totalCalories += food.calories;
              totalCarbs += food.carbohydrates;
              totalFat += food.fat;
              totalProtein += food.protein;
              rows.push(
                <tr key={`food-${food.id}-${food.DiaryLogFood.quantity}-${i}`}>
                  <td>{food.foodName}</td>
                  <td>{food.calories}</td>
                  <td>{food.carbohydrates}</td>
                  <td>{food.fat}</td>
                  <td>{food.protein}</td>
                  <td><button type="button" className="remove-button" onClick={(e) => handleRemoveFood(e, food.id, food.foodName, diaryLog.logName, diaryLog.id)}>Remove</button></td>
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
          <button className="remember-meal-button"
            onClick={() => history.push({
              pathname: '/meal/new',
              state: { diaryLog }
            })}>Remember Meal</button>
          <button className="add-log-button"
            onClick={() => history.push({
              pathname: `/food/diary/${diaryLog.id}/add`,
              state: { diaryLog }
            })}>Add Food</button>
            <button className="add-log-button"
            onClick={() => history.push({
              pathname: `/meal/diary/${diaryLog.id}/add`,
              state: { diaryLog }
            })}>Add Meal</button>
        </div>
      );
    } else {
      return (
        <div key={logName} className='diary-log-container'>
          <h3>{logName}</h3>
          <p>Not Logged Yet</p>
          <button className="add-log-button"
            onClick={() => history.push({
              pathname: '/food/diary/new',
              state: { logName: logName, logDate: selectedDate }
            })}>Add Food</button>
           <button className="add-log-button"
            onClick={() => history.push({
              pathname: `/meal/diary/new`,
              state: { logName: logName, logDate: selectedDate }
            })}>Add Meal</button>
        </div>
      );
    }
  });


  return isLoaded && (
    <div className="container-container">
      <input type="date"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))} />
      {diaryLogsToRender}
    </div>
  )
}

export default FoodDiary;
