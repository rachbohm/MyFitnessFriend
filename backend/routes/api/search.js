const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const fetch = require('node-fetch');

const router = express.Router();

//get all meals of the current user
router.get('/:searchTerm', requireAuth, async (req, res, next) => {
  const { searchTerm } = req.params;
  const results = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?&api_key=eZ1TOC3jqLgozDmGlFWCjPz0Gc0sy41bzPfmr77e&query=${searchTerm}`);
  const data = await results.json();
  const filteredData = data.foods.slice(0, 50).map(food => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~` food:", "food keys", Object.keys(food))
    const { description, foodNutrients, servingSize, fdcId } = food;
    const protein = foodNutrients.find(n => n.nutrientName === 'Protein' && n.unitName === 'G');
    const proteinValue = protein ? protein.value : null;
    const carbs = foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference' && n.unitName === 'G');
    const carbsValue = carbs ? carbs.value : null;
    const fat = foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)' && n.unitName === 'G');
    const fatValue = fat ? fat.value : null;

    const per100gNutrients = foodNutrients.find(n => n.nutrientNumber === '255' && n.unitName === 'G');
    const isPer100g = per100gNutrients ? true : false;
    console.log("~~~~~~~~~~~~~~~~~~~~~isPer100g", isPer100g)
    console.log("foodMeasures", food.foodMeasures)


    // calculate calories
    const caloriesValue = proteinValue * 4 + carbsValue * 4 + fatValue * 9;

    const servingSizeNum = isPer100g ? 100 : null;
    const servingSizeUnit = isPer100g ? "g" : null;


    return isPer100g && { fdcId, description, proteinValue, carbsValue, fatValue, caloriesValue, servingSizeNum, servingSizeUnit };

  });
  // console.log('filteredData', filteredData)
  return res.json(filteredData);
});


module.exports = router;
