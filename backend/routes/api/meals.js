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
  try {
    const { mealName, mealNotes, servingSizeNum, servingSizeUnit, foods } = req.body;
    const { user } = req;

    // Create a new meal record in the database
    const meal = await Meal.create({
      mealName,
      userId: user.id,
      mealNotes,
      servingSizeNum,
      servingSizeUnit
    });

    // Associate food items with the new meal
    await Promise.all(foods.map(async (food) => {
      const [mealFood, created] = await MealFood.findOrCreate({
        where: { mealId: meal.id, foodId: food.id },
        defaults: { servingSizeNum: food.servingSizeNum, servingSizeUnit: food.servingSizeUnit }
      });
      return mealFood;
    }));

    // Fetch the updated meal record with associated food items
    const createdMeal = await Meal.findByPk(meal.id, {
      include: [Food]
    });

    res.status(201).json(createdMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
