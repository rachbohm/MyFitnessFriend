import { createFoodThunk } from "../../store/foods";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateFoodPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [carbohydrates, setCarbohydrates] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [servingSizeNum, setServingSizeNum] = useState('')
  const [servingSizeUnit, setServingSizeUnit] = useState('')
  const [servingsPerContainer, setServingsPerContainer] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      foodName,
      calories,
      carbohydrates,
      protein,
      fat,
      servingSizeNum,
      servingSizeUnit,
      servingsPerContainer
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

  if (!sessionUser) {
    window.alert('Please log in to create a food.')
    history.push('/login');
    return null;
  }

  return (
    <div>
      <form className="add-food-form" onSubmit={handleSubmit}>
        {errors.length > 0 && errors.map((error, i) => {
          return <div key={i}>{error}</div>
        })}
        <h3>Create New Food</h3>

        <label> Food Name
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </label>

        <label> Serving Size
          <input
            type="number"
            value={servingSizeNum}
            onChange={(e) => setServingSizeNum(e.target.value)}
          />
        </label>

        <label> Serving Size Unit
          <input
            type="text"
            value={servingSizeUnit}
            onChange={(e) => setServingSizeUnit(e.target.value)}
          />
        </label>

        <label> Servings Per Container
          <input
            type="number"
            value={servingsPerContainer}
            onChange={(e) => setServingsPerContainer(e.target.value)}
          />
        </label>

        <label> Calories
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </label>

        <label> Carbohydrates(grams)
          <input
            type="number"
            value={carbohydrates}
            onChange={(e) => setCarbohydrates(e.target.value)}
          />
        </label>

        <label> Protein(grams)
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </label>

        <label> Fat(grams)
          <input
            type="number"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default CreateFoodPage;
