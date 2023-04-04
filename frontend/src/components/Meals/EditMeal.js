import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { loadMyMealsThunk, editMealThunk, removeFoodFromMealThunk } from '../../store/meals';

const EditMeal = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { mealId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mealName, setMealName] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    dispatch(loadMyMealsThunk());
    dispatch(loadMealFoodsThunk(mealId))
      .then(() => {
        setIsLoaded(true)
      })
  }, [dispatch, mealId]);

  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);
  const meal = mealsArr.find((meal) => meal.id == mealId)

  const mealFoods = useSelector((state) => state.mealFoodsState);
  const mealFoodsArr = Object.values(mealFoods);

  const handleRemoveFood = (foodId) => {
    const newMealFoodsArr = mealFoodsArr.filter((food) => food.id !== foodId);
    dispatch(removeFoodFromMealThunk(mealId, foodId, newMealFoodsArr))
      .then(() => {
        setSuccess(true)
        dispatch(loadMealFoodsThunk(mealId));
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors(Object.values(data.errors));
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      mealName,
    };

    if (window.confirm("Please confirm form submission")) {
      await dispatch(editMealThunk(payload, mealId))
        .then(() => {
          setSuccess(true);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setErrors(Object.values(data.errors));
        });
    }
  };

  useEffect(() => {
    if (meal) {
      setMealName(meal.mealName)
    }
  }, [meal]);

  if (!meal) {
    return <div>Invalid meal ID.</div>
  }

  return (
    isLoaded && meal && (
      <form className="edit-meal-form" onSubmit={handleSubmit}>
        {success && <div>Meal successfully edited.</div>}

        <h3>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </h3>
        <table className="meal-table">
          <thead>
            <tr>
              <th className='items-heading'>Items in This Meal</th>
              <th>Calories</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Protein</th>
              <th>Serving Size</th>
            </tr>
          </thead>
          <tbody>
            {mealFoodsArr.map((food) => {
              let rows = [];

              rows.push(
                <tr key={food.id}>
                  <td>{food.foodName}</td>
                  <td>{food.calories}</td>
                  <td>{food.carbohydrates}g</td>
                  <td>{food.fat}g</td>
                  <td>{food.protein}g</td>
                  <td>{food.servingSizeNum} {food.servingSizeUnit}</td>
                  <td><button onClick={()=> handleRemoveFood(food.id)}>Remove</button></td>
                </tr>
              );
              return rows;
            })}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    )
  )
}

export default EditMeal;
