import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk } from '../../store/foods';
import './MyFoodList.css';

const MyFoodList = () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const ulRef = useRef();

  const openDetails = () => {
    if (showDetails) return;
    setShowDetails(true);
  }

  useEffect(() => {
    dispatch(loadMyFoodsThunk())
  }, [dispatch]);

useEffect(() => {
  if (!showDetails) return;

  const closeDetails = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowDetails(false);
    }
  };

  document.addEventListener('click', closeDetails);

  return () => document.removeEventListener("click", closeDetails);
}, [showDetails]);


let foods = useSelector(state => state.foodState);
let foodsArr = Object.values(foods);


const ulClassName = "food-details" + (showDetails ? "" : " hidden");

return (
  <ul>
    <h2>Your Personal Foods</h2>
    {foodsArr.map((food) => (
      <li key={food.id}><button onClick={openDetails}>{food.foodName}</button>
        <ul className={ulClassName} ref={ulRef}>

          <div>Calories: {food.calories}</div>
          <div>Carbohydrates(grams): {food.carbohydrates}</div>
          <div>Fat(grams): {food.fat}</div>
          <div>Protein(grams): {food.protein}</div>
          <div>Serving Size: {food.servingSizeNum} {food.servingSizeUnit}</div>
          <div>Servings Per Container: {food.servingsPerContainer}</div>
        </ul>
      </li>
    ))}
  </ul>
)
}

export default MyFoodList;
