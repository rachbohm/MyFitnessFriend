import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk, deleteFoodThunk } from '../../store/foods';
import './MyFoodList.css';

const MyFoodList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(null); // Use null to indicate no food item is selected

  const openDetails = (food) => {
    setShowDetails(food === showDetails ? null : food); // Toggle showDetails between the clicked item and null
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
        setShowDetails(null);
        history.push('/food/mine');
      });
    }
  };

  return (
    <ul className="food-container">
      <div className="heading">
      <h2>Your Personal Foods</h2>
      <button className="create-button" onClick={() => history.push('/food/new')}>Create Food</button>
      </div>
      <ul className="food-list">
      {foodsArr.map((food) => (
        <li className="food-name-li" key={food.id}>
          <a href="#" onClick={() => openDetails(food)}>{food.foodName}</a>
        </li>
      ))}
      </ul>
      {showDetails !== null && (
        <ul className="food-details">
          <button className="edit-button" onClick={() => history.push(`/food/edit/${showDetails.id}`)}>Edit Food</button>
          <button className="delete-button" onClick={() => deleteHandler(showDetails)}>Delete Food</button>
          <h3 className="food-name">{showDetails.foodName}</h3>
          <table>
            <tbody>
              <tr>
                <td>Calories:</td>
                <td>{showDetails.calories}</td>
              </tr>
              <tr>
                <td>Carbohydrates (g):</td>
                <td>{showDetails.carbohydrates}</td>
              </tr>
              <tr>
                <td>Fat (g):</td>
                <td>{showDetails.fat}</td>
              </tr>
              <tr>
                <td>Protein (g):</td>
                <td>{showDetails.protein}</td>
              </tr>
              <tr>
                <td>Serving Size:</td>
                <td>{showDetails.servingSizeNum} {showDetails.servingSizeUnit}</td>
              </tr>
              {/* <tr>
                <td>Servings Per Container:</td>
                <td>{showDetails.servingsPerContainer}</td>
              </tr> */}
            </tbody>
          </table>
        </ul>
      )}
    </ul>
  );
};

export default MyFoodList;
