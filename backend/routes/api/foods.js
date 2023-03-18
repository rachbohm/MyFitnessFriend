const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', async (req, res, next) => {
  const { user } = req;
  const foods = await Food.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json(foods)
})

module.exports = router;
