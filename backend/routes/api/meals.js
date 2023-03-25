const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all meals of the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const meals = await Meal.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: Food,
      }
    ]
  });
  return res.json(meals)
});

// Create a new meal with multiple food items
router.post('/', async (req, res, next) => {
  const { mealName, foods, quantity } = req.body;
  const { user } = req;

  const newMeal = await Meal.create({
    mealName,
    userId: user.id,
  });

  console.log('``````````````quantity', quantity)

  console.log('foods', foods)

  for (let i = 0; i < quantity; i++) {
    for (let j = 0; j < foods.length; j++){

      const mealFood = await MealFood.create({
        mealId: newMeal.id,
        foodId: foods[j].id,
      });
    }
  }
  return res.json(newMeal);
});

module.exports = router;
