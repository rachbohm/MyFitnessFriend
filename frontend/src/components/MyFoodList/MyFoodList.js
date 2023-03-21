import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk } from '../../store/foods';
import './MyFoodList.css';

const MyFoodList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(null); // Use null to indicate no food item is selected

  const openDetails = (id) => {
    setShowDetails(id === showDetails ? null : id); // Toggle showDetails between the ID of the clicked item and null
  };

  useEffect(() => {
    dispatch(loadMyFoodsThunk());
  }, [dispatch]);

  let foods = useSelector((state) => state.foodState);
  let foodsArr = Object.values(foods);

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    history.push('/login')
  }

  return (
    <ul>
      <h2>Your Personal Foods</h2>
      <button onClick={() => history.push('/food/new')}>Create Food</button>
      {foodsArr.map((food) => (
        <li key={food.id}>
          <button onClick={() => openDetails(food.id)}>{food.foodName}</button>
          {showDetails === food.id && ( // Show details only for the selected food item
            <ul className="food-details">
              <table>
                <tbody>
                  <tr>
                    <td>Calories:</td>
                    <td>{food.calories}</td>
                  </tr>
                  <tr>
                    <td>Carbohydrates (g):</td>
                    <td>{food.carbohydrates}</td>
                  </tr>
                  <tr>
                    <td>Fat (g):</td>
                    <td>{food.fat}</td>
                  </tr>
                  <tr>
                    <td>Protein (g):</td>
                    <td>{food.protein}</td>
                  </tr>
                  <tr>
                    <td>Serving Size:</td>
                    <td>{food.servingSizeNum} {food.servingSizeUnit}</td>
                  </tr>
                  <tr>
                    <td>Servings Per Container:</td>
                    <td>{food.servingsPerContainer}</td>
                  </tr>
                </tbody>
              </table>
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MyFoodList;
