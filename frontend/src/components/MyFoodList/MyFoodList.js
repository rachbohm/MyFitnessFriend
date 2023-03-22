import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
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

  const deleteHandler = (food) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      dispatch(deleteFoodThunk(food.id)).then(() => {
        history.push('/food/mine');
      });
    }
  };

  return (
    <ul>
      <h2>Your Personal Foods</h2>
      <button className="create-button" onClick={() => history.push('/food/new')}>Create Food</button>
      {foodsArr.map((food) => (
        <li key={food.id}>
          <a href="#" onClick={() => openDetails(food.id)}>{food.foodName}</a>
          {showDetails === food.id && ( // Show details only for the selected food item
            <ul className="food-details">
              <button className="edit-button" onClick={() => history.push(`/food/edit/${food.id}`)}>Edit Food</button>
              <button className="delete-button" onClick={() => deleteHandler(food)}>Delete Food</button>
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
