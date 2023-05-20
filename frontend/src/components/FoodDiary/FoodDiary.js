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
  const [edited, setEdited] = useState(false);
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000; // get the user's timezone offset in milliseconds
  const [selectedDate, setSelectedDate] = useState(location.state?.logDate ? new Date(location.state.logDate) : new Date(Date.now() - userTimezoneOffset));

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
  };

  const handleDateChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      setSelectedDate(new Date(selectedValue));
    } else {
      setSelectedDate(new Date(Date.now() - userTimezoneOffset));
    }
  };

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
              totalCalories += parseFloat(food.calories);
              totalCarbs += parseFloat(food.carbohydrates);
              totalFat += parseFloat(food.fat);
              totalProtein += parseFloat(food.protein);
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
                <th>Carbohydrates (g)</th>
                <th>Fat (g)</th>
                <th>Protein (g)</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
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

  const today = new Date(Date.now() - userTimezoneOffset); // apply the offset to today's date

  return isLoaded && (
    <div className="container-container">
      <input type="date"
        value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
        onChange={handleDateChange}
        max={today.toISOString().slice(0, 10)} />
      {diaryLogsToRender}
    </div>
  )
}

export default FoodDiary;
