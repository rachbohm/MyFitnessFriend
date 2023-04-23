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
      // {
      //   model: Meal,
      //   through: {
      //     model: DiaryLogMeal,
      //     attributes: ['quantity']
      //   },
      //   include: [
      //     {
      //       model: Food,
      //       through: {
      //         model: MealFood,
      //         attributes: ['quantity']
      //       }
      //     }
      //   ]
      // },
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

//Create a new diaryLog with multiple food items
router.post('/', async (req, res, next) => {
  const { logName, logDate, foods } = req.body;
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

  // for (const meal of meals) {
  //   const diaryLogMeal = await DiaryLogMeal.findOne({
  //     where: {
  //       diaryLogId: newDiaryLog.id,
  //       mealId: meal.id
  //     }
  //   });

  //   if (diaryLogMeal) {
  //     diaryLogMeal.quantity++;
  //     await diaryLogMeal.save();
  //   } else {
  //     await DiaryLogMeal.create({
  //       diaryLogId: newDiaryLog.id,
  //       mealId: meal.id,
  //       quantity: 1
  //     })
  //   }
  // }
  return res.json(newDiaryLog)
});

//Add food to an existing diaryLog
router.put('/:diaryLogId', requireAuth, async (req, res, next) => {
  const { diaryLog, foods } = req.body;
  const { user } = req;

  const targetDiaryLog = await DiaryLog.findByPk(diaryLog.id);

  if (diaryLog.userId === user.id) {

    for (const food of foods) {
      const diaryLogFood = await DiaryLogFood.findOne({
        where: {
          diaryLogId: diaryLog.id,
          foodId: food.id
        }
      });

      if (diaryLogFood) {
        diaryLogFood.quantity++;
        await diaryLogFood.save();
      } else {
        await DiaryLogFood.create({
          diaryLogId: diaryLog.id,
          foodId: food.id,
          quantity: 1
        })
      }
    }
    return res.json(targetDiaryLog)
  } else {
    const err = new Error("Unauthorized")
    err.status = 403;
    err.errors = ['Current user is unauthorized']
    return next(err)
  }
});

//remove a food from a diaryLog
router.delete('/:diaryLogId/foods/:foodId', requireAuth, async (req, res, next) => {
  const { diaryLogId, foodId } = req.params;
  const userId = req.user.id;

  const targetDiaryLog = await DiaryLog.findByPk(diaryLogId);

  const diaryLogFood = await DiaryLogFood.findOne({
    where: { diaryLogId, foodId }
  });

  if (diaryLogFood.quantity > 1) {
    diaryLogFood.quantity--;
    await diaryLogFood.save();
  } else {
    await diaryLogFood.destroy();
  }

  const updatedDiaryLog = await DiaryLog.findByPk(diaryLogId);
  return res.json(updatedDiaryLog);
});

module.exports = router;
