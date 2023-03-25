import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const RememberMeal = () => {
  const location = useLocation();
  const { diaryLog } = location.state;

  return (
    <div>
      <h1>Remember Meal</h1>
      {console.log(diaryLog)}
    <p>Selected diary log: {diaryLog.logName}</p>
    </div>
  )
}

export default RememberMeal;
