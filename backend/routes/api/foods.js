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
