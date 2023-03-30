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
        through: {
          model: MealFood,
          attributes: ['quantity']
        }
      },
      {
        model: MealFood
      }
    ]
  })
  return res.json(meals)
});


// Create a new meal with multiple food items
router.post('/', async (req, res, next) => {
  const { mealName, foods, meals } = req.body;
  const { user } = req;

  const newMeal = await Meal.create({
    mealName,
    userId: user.id,
  });

  await foods.map((food) => {
     MealFood.create({
       mealId: newMeal.id,
       foodId: food.id,
       quantity: food.DiaryLogFood.quantity
     })
  })

  await meals.map((meal) => {
    for (let i = 0; i < meal.DiaryLogMeal.quantity; i++){

      meal.Food.map((food) => {
        MealFood.create({
          mealId: newMeal.id,
          foodId: food.id,
          quantity: food.MealFood.quantity
        })
      })
    }
  })
    return res.json(newMeal);
});

//edit a meal
router.put('/:mealId', requireAuth, async (req, res, next) => {
  const { mealId } = req.params;
  const { mealName } = req.body;
  const userId = req.user.id;

  const targetMeal = await Meal.findByPk(mealId);

  if (!targetMeal) {
    const err = new Error("Meal not found")
    err.status = 404;
    err.errors = ["Meal couldn't be found"];
    return next(err)
  }

  if (targetMeal.userId === userId) {
    targetMeal.mealName = mealName
    await targetFood.save();
    return res.json(targetFood);
  } else {
    const err = new Error("Unauthorized")
    err.status = 403;
    err.errors = ['Current user is unauthorized']
    return next(err)
  }
})

module.exports = router;
