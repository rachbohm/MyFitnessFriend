import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyFoodsThunk } from '../../store/foods';

const MyFoodList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyFoodsThunk())
  }, [dispatch]);

  let foods = useSelector(state => state.foodState);
  let foodsArr = Object.values(foods);

  return (
    <ul>My Foods
      {foodsArr.map((food) => (
        <li key={food.id}>Name: {food.foodName}
          <div>Calories: {food.calories}</div>
          <div>Carbohydrates(grams): {food.carbohydrates}</div>
          <div>Fat(grams): {food.fat}</div>
          <div>Protein(grams): {food.protein}</div>
          <div>Serving Size: {food.servingSizeNum} {food.servingSizeUnit}</div>
          <div>Servings Per Container: {food.servingsPerContainer}</div>
        </li>
      ))}
    </ul>
  )
}

export default MyFoodList;
