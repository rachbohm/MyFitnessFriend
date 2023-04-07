const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog, DiaryLogMeal, DiaryLogFood } = require('../../db/models');
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
        through: {
          model: DiaryLogMeal,
          attributes: ['quantity']
        },
        include: [
          {
            model: Food,
            through: {
              model: MealFood,
              attributes: ['quantity']
            }
          }
        ]
      },
      {
        model: Food,
        through: {
          model: DiaryLogFood,
          attributes: ['quantity']
        }
      }
    ]
  });
  return res.json(diaryLogs)
});

//Create a new diaryLog with multiple food and/or meal items
router.post('/', async (req, res, next) => {
  const { logName, logDate, foods, meals } = req.body;
  const { user } = req;

  const newDiaryLog = await DiaryLog.create({
    logName,
    logDate,
    userId: user.id
  });

  for (const food of foods) {
    const diaryLogFood = await DiaryLogFood.findOne({
      where: {
        diaryLogId: newDiaryLog.id,
        foodId: food.id
      }
    });

    if (diaryLogFood) {
      diaryLogFood.quantity++;
      await diaryLogFood.save();
    } else {
      await DiaryLogFood.create({
        diaryLogId: newDiaryLog.id,
        foodId: food.id,
        quantity: 1
      })
    }
  };

  for (const meal of meals) {
    const diaryLogMeal = await DiaryLogMeal.findOne({
      where: {
        diaryLogId: newDiaryLog.id,
        mealId: meal.id
      }
    });

    if (diaryLogMeal) {
      diaryLogMeal.quantity++;
      await diaryLogMeal.save();
    } else {
      await DiaryLogMeal.create({
        diaryLogId: newDiaryLog.id,
        mealId: meal.id,
        quantity: 1
      })
    }
  }
  return res.json(newDiaryLog)
})

module.exports = router;
