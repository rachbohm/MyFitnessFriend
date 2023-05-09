import { useEffect, useState } from 'react';
import { createFoodThunk } from '../../store/foods';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      foodName: item.description,
      calories: item.foodNutrients[3].value,
      carbohydrates: item.foodNutrients[2].value,
      protein: item.foodNutrients[0].value,
      fat: item.foodNutrients[1].value,
      servingSizeNum: item.servingSize,
      servingSizeUnit: item.servingSizeUnit,
      servingsPerContainer: 1
    };

    if (window.confirm('Please confirm form submission')) {
      await dispatch(createFoodThunk(payload))
        .then(() => {
          history.push('/food/mine')
        }).catch(async res => {
          const data = await res.json();
          if (data.errors) setErrors(Object.values(data.errors));
        })
    }
  }

  return (
    <div className='food-details'>
      <h3 className="food-name">{item.description}</h3>
      <form className="create-food-form" onSubmit={handleSubmit}>
        {console.log('item', item)}
        <table>
          <tbody>
            <tr>
              <td>Calories:</td>
              <td>{item.foodNutrients[3].value}</td>
            </tr>
            <tr>
              <td>Carbohydrates (g):</td>
              <td>{item.foodNutrients[2].value}</td>
            </tr>
            <tr>
              <td>Fat (g):</td>
              <td>{item.foodNutrients[1].value}</td>
            </tr>
            <tr>
              <td>Protein (g):</td>
              <td>{item.foodNutrients[0].value}</td>
            </tr>
            <tr>
              <td>Serving Size:</td>
              <td>{item.servingSize} {item.servingSizeUnit}</td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FoodCard;
