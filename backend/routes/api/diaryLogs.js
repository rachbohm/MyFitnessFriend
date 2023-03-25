const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all diary logs of the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const diaryLogs = await DiaryLog.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: Meal,
        as: 'meal',
        include: [ Food ]
      },
      {
        model: Food,
        as: 'food'
      }
    ]
  })
  return res.json(diaryLogs)
})



module.exports = router;
