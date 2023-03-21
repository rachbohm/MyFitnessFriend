const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all foods of the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const foods = await Food.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json(foods)
})

module.exports = router;

//create a food
const validateFood = [
  check('foodName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Food name is required'),
  check('calories')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Calories are required'),
  check('carbohydrates')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Carbohydrates are required'),
  check('protein')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Protein is required'),
  check('fat')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Fat is required'),
  check('servingSizeNum')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Serving size (number) is required'),
  check('servingSizeUnit')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Serving size (unit) is required'),
  check('servingsPerContainer')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Servings per Container is required'),
  handleValidationErrors
]
router.post('/', requireAuth, validateFood, async (req, res, next) => {
  const { user } = req;
  const { foodName, calories, carbohydrates, protein, fat, servingSizeNum, servingSizeUnit, servingsPerContainer } = req.body;

  const newFood = await Food.create({
    userId: user.id,
    foodName,
    calories,
    carbohydrates,
    protein,
    fat,
    servingSizeNum,
    servingSizeUnit,
    servingsPerContainer
  })

  return res.json(newFood)
})

//edit a food
router.put('/:foodId', requireAuth, async (req, res, next) => {
  const { foodId } = req.params;
  const { foodName, calories, carbohydrates, protein, fat, servingSizeNum, servingSizeUnit, servingsPerContainer } = req.body;
  const userId = req.user.id;

  const targetFood = await Food.findByPk(foodId);

  if (!targetFood) {
    const err = new Error("Food not found")
    err.status = 404;
    err.errors = ["Food couldn't be found"];
    return next(err)
  }

  if (targetFood.userId === userId) {
    targetFood.foodName = foodName;
    targetFood.calories = calories;
    targetFood.carbohydrates = carbohydrates;
    targetFood.protein = protein;
    targetFood.fat = fat;
    targetFood.servingSizeNum = servingSizeNum;
    targetFood.servingSizeUnit = servingSizeUnit;
    targetFood.servingsPerContainer = servingsPerContainer;
    await targetFood.save();
    return res.json(targetFood);
  } else {
    const err = new Error("Unauthorized")
    err.status = 403;
    err.errors = ['Current user is unauthorized']
    return next(err)
  }
})
