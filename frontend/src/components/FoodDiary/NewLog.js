import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadDiaryLogsThunk, createDiaryLogThunk } from '../../store/diarylogs';
import { loadMyFoodsThunk } from '../../store/foods';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { loadMyMealsThunk } from '../../store/meals';


const NewLog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { logName, logDate } = location.state;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodQuantities, setFoodQuantities] = useState({});

  useEffect(() => {
    dispatch(loadMyFoodsThunk())
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


  const handleFoodSelection = (event, food) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedFoods([...selectedFoods, food]);
      setFoodQuantities({ ...foodQuantities, [food.id]: 1 });
    } else {
      setSelectedFoods(selectedFoods.filter(f => f.id !== food.id));
      const newQuantities = { ...foodQuantities };
      delete newQuantities[food.id];
      setFoodQuantities(newQuantities);
    }
  };

  const handleQuantityChange = (event, foodId) => {
    const newQuantities = { ...foodQuantities };
    newQuantities[foodId] = parseInt(event.target.value);
    setFoodQuantities(newQuantities);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const foodsToAdd = selectedFoods.flatMap((food) => {
      const quantity = foodQuantities[food.id];
      if (!quantity) return [];
      return Array.from({length: quantity}, () => food);
    });
    console.log('foodsToAdd', foodsToAdd)
    if (window.confirm('Please confirm form submission')) {
      await dispatch(createDiaryLogThunk({logName, logDate, foods: foodsToAdd}))
        .then(() => {
          history.push({
            pathname: '/food/diary',
            state: { logDate: logDate }
          });
        });
    }
  };

  return (
    isLoaded && (
      <div className="new-diary-log-food-container">
        <h2>Add Food To {logName} on {logDate.toISOString().slice(0, 10)}</h2>
        <form onSubmit={handleSubmit}>
          {foodsArr.map((food) => (
            <div key={food.id}>
              <label>
                <input
                  type="checkbox"
                  value={food.id}
                  onChange={(event) => handleFoodSelection(event, food)}
                />
                {food.foodName}
              </label>

              <label htmlFor="quantity"> Quantity
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  onChange={(event) => handleQuantityChange(event, food.id)}
                  value={foodQuantities[food.id] || 1}
                />

              </label>

              <label> of:
                {' '}{food.servingSizeNum} {food.servingSizeUnit}

              </label>

            </div>
          ))}
          <button type="submit">Add Selected Foods</button>
        </form>
      </div>
    )
  );
};

export default NewLog;
