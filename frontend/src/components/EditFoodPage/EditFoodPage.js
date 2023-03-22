import { loadMyFoodsThunk, editFoodThunk } from "../../store/foods";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditFoodPage.css'

const EditFoodPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { foodId } = useParams();

  useEffect(() => {
    dispatch(loadMyFoodsThunk())
      .then(() => {
        setIsLoaded(true)
      })
  }, [dispatch, foodId]);

  const [initialFoodData, setInitialFoodData] = useState({});
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [servingSizeNum, setServingSizeNum] = useState("");
  const [servingSizeUnit, setServingSizeUnit] = useState("");
  const [servingsPerContainer, setServingsPerContainer] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let foodState = useSelector((state) => state.foodState)
  let oneFoodData = useSelector((state) => state.foodState[foodId]);

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
      await dispatch(editFoodThunk(payload, foodId))
        .then(() => {
          history.push('/food/mine')
        }).catch(async res => {
          const data = await res.json();
          if (data.errors) setErrors(Object.values(data.errors));
        })
    }
  }

  useEffect(() => {
    if (oneFoodData) {
      setInitialFoodData(oneFoodData);
      setFoodName(oneFoodData.foodName);
      setCalories(oneFoodData.calories);
      setCarbohydrates(oneFoodData.carbohydrates);
      setProtein(oneFoodData.protein);
      setFat(oneFoodData.fat);
      setServingSizeNum(oneFoodData.servingSizeNum);
      setServingSizeUnit(oneFoodData.servingSizeUnit);
      setServingsPerContainer(oneFoodData.servingsPerContainer);
    }
  }, [oneFoodData]);

  if (!sessionUser) {
    history.push('/login');
    return null;
  }

  if (isLoaded == false) {
    return <div>Loading...</div>
  }

  if (!oneFoodData) {
    return <div>Invalid food ID.</div>;
  }

  return isLoaded && oneFoodData && (
     <div>
      <form className="add-food-form" onSubmit={handleSubmit}>
        {errors.length > 0 && errors.map((error, i) => {
          return <div key={i}>{error}</div>
        })}
        <h3>Edit Food</h3>
        <table>
          <tbody>
            <tr>
              <td>Food Name:</td>
              <td>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Calories:</td>
              <td>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Carbohydrates (g):</td>
              <td>
                <input
                  type="number"
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Fat (g):</td>
              <td>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Protein (g):</td>
              <td>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Serving Size (Number):</td>
              <td>
                <input
                  type="number"
                  value={servingSizeNum}
                  onChange={(e) => setServingSizeNum(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Serving Size (Unit):</td>
              <td>
                <input
                  type="text"
                  value={servingSizeUnit}
                  onChange={(e) => setServingSizeUnit(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Servings Per Container:</td>
              <td>
                <input
                  type="number"
                  value={servingsPerContainer}
                  onChange={(e) => setServingsPerContainer(e.target.value)}
                  required
                />
              </td>
            </tr>

          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default EditFoodPage;
