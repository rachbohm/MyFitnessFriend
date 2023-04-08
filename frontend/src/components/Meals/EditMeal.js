import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadMealFoodsThunk } from '../../store/mealFoods';
import { loadMyMealsThunk, editMealThunk, removeFoodFromMealThunk, removeMealThunk } from '../../store/meals';

const EditMeal = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { mealId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mealName, setMealName] = useState('');
  const [errors, setErrors] = useState([]);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    dispatch(loadMyMealsThunk());
    dispatch(loadMealFoodsThunk(mealId))
      .then(() => {
        setIsLoaded(true)
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors(Object.values(data.errors));
      });
  }, [dispatch, mealId]);

  let meals = useSelector((state) => state.mealState);
  let mealsArr = Object.values(meals);
  const meal = mealsArr.find((meal) => meal.id == mealId)

  const mealFoods = useSelector((state) => state.mealFoodsState);
  const mealFoodsArr = Object.values(mealFoods);

  const handleRemoveFood = async (e, foodId, foodName) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to remove ${foodName} from ${mealName}?`)) {

      dispatch(removeFoodFromMealThunk(mealId, foodId))
        .then(() => {
          setEdited(true);
          dispatch(loadMealFoodsThunk(mealId));
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setErrors(Object.values(data.errors));
        });
    }
  };

  const handleDeleteMeal = async (e, mealId) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this meal?")) {
      await dispatch(removeMealThunk(mealId))
        .then(() => {
          window.alert('Meal deleted')
          history.push('/meal/mine')
        })
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      mealName,
    };

    if (window.confirm("Please confirm form submission")) {
      await dispatch(editMealThunk(payload, mealId))
        .then(() => {
          window.alert('Meal successfully edited')
          history.push(`/meal/mine`);
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

  useEffect(() => {
    if (!mealFoodsArr.length && isLoaded && meal) {
      dispatch(removeMealThunk(mealId))
        .then(() => {
          window.alert('Meal deleted. A meal must have at least 1 food.')
          history.push('/meal/mine')
        }
        )
    }
  })

  return (
    <div>
      {errors.length > 0 && errors.map((error, i) => {
        return <div key={i}>{error}</div>
      })}
      {isLoaded && meal && (
        <form className="edit-meal-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={(e) => handleDeleteMeal(e, mealId)}>Delete Meal</button>
          </div>
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
                    <td><button type="button" onClick={(e) => handleRemoveFood(e, food.id, food.foodName)}>Remove</button></td>
                  </tr>
                );
                return rows;
              })}
            </tbody>
          </table>
        </form>
      )
      }
    </div>
  )
}

export default EditMeal;
