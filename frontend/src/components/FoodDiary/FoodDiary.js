import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
import { loadMyMealsThunk } from '../../store/meals';
import { loadDiaryLogsThunk } from '../../store/diarylogs';


const FoodDiary = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadDiaryLogsThunk());
  }, [dispatch]);

  const diaryLogs = useSelector((state) => state.diaryLogState);
  const diaryLogsArr = Object.values(diaryLogs);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  }

  return (
    <div>
      {diaryLogsArr.map((diaryLog) => {
     <tbody>
     {diaryLog.food && (
       <tr>
         <td>{diaryLog.food.foodName}</td>
         <td>{diaryLog.food.calories}</td>
         <td>{diaryLog.food.carbs}</td>
         <td>{diaryLog.food.fat}</td>
         <td>{diaryLog.food.protein}</td>
       </tr>
     )}
     {diaryLog.meal && diaryLog.meal.foods && Array.isArray(diaryLog.meal.foods) && (
       diaryLog.meal.foods.map((food) => (
         <tr key={food.id}>
           <td>{food.foodName}</td>
           <td>{food.calories}</td>
           <td>{food.carbs}</td>
           <td>{food.fat}</td>
           <td>{food.protein}</td>
         </tr>
       ))
     )}
   </tbody>



      })}
    </div>
  );
}

export default FoodDiary;
