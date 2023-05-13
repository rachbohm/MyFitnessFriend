import { useEffect, useState } from 'react';
import { createFoodThunk } from '../../store/foods';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './FoodCard.css';

const FoodCard = ({ item, onBack }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      foodName: item.food_name,
      calories: item.nf_calories,
      carbohydrates: item.nf_total_carbohydrate,
      protein: item.nf_protein,
      fat: item.nf_total_fat,
      servingSizeNum: item.serving_qty,
      servingSizeUnit: item.serving_unit,
      // servingsPerContainer: 1
    };

    console.log('payload', payload)

    if (window.confirm('Please confirm form submission')) {
      await dispatch(createFoodThunk(payload))
        .then(() => {
          history.push('/food/mine')
        }).catch(async res => {
          const data = await res.json();
          if (data.errors) setErrors(Object.values(data.errors));
        })
    }
  };

  const handleBack = () => {
    onBack(); // Call the callback function from SearchBar to reset the selectedFood state
    history.push('/search'); // Navigate back to the search page
  };

  return (
    <div className='food-details-card'>
      <h3 className="food-name-card">{item.food_name}</h3>
      <form className="create-food-form-card" onSubmit={handleSubmit}>
        {/* {console.log('item', item)} */}
        <table>
          <tbody>
            <tr>
              <td>Calories:</td>
              <td>{item.nf_calories}</td>
            </tr>
            <tr>
              <td>Carbohydrates (g):</td>
              <td>{item.nf_total_carbohydrate}</td>
            </tr>
            <tr>
              <td>Fat (g):</td>
              <td>{item.nf_total_fat}</td>
            </tr>
            <tr>
              <td>Protein (g):</td>
              <td>{item.nf_protein}</td>
            </tr>
            <tr>
              <td>Serving Size:</td>
              <td>{item.serving_qty} {item.serving_unit}</td>
            </tr>
          </tbody>
        </table>
        <div className='buttons-card'>
          <button className="back-button-card" onClick={handleBack}>Back to Search</button>
          <button type="submit" className="create-button-card">Add to My Foods</button>
        </div>
      </form>
    </div>
  )
}

export default FoodCard;
