import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadDiaryLogsThunk, editDiaryLogThunk } from '../../store/diarylogs';
import { loadMyFoodsThunk } from '../../store/foods';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { loadMyMealsThunk } from '../../store/meals';

const AddMealLog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { diaryLog } = location.state;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    dispatch(loadMyMealsThunk())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  const foods = useSelector((state) => state.foodState);
  const foodsArr = Object.values(foods);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login');
  }

  return (
    <h1>AddMealLog</h1>
  )
}

export default AddMealLog;
