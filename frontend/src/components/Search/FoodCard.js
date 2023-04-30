import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const FoodCard = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('item', item)

  const servingsPerContainer = (item) => {
    let unit = item.servingSizeUnit;
    console.log('unit', unit)
    let containerUnitIndex = item.packageWeight.indexOf(unit);
    console.log('containerUnitIndex', containerUnitIndex)
    if (containerUnitIndex === -1) {
      return 1
    }
    let weight = item.packageWeight.slice(containerUnitIndex + unit.length + 1);
    console.log('weight', weight)
    let containerUnits = parseFloat(weight);
    console.log('containerUnits', containerUnits)
    return containerUnits / item.servingSize;
  }

  return (
    <div className='food-details'>
      <h3 className="food-name">{item.description}</h3>
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
          <tr>
            <td>Servings Per Container:</td>
            <td>{servingsPerContainer(item)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FoodCard;
