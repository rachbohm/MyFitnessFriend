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
        }
      }]
  })
  return res.json(meals)
});

//get all foods of the current meal
router.get(`/:id`, requireAuth, async (req, res, next) => {
  const id = req.params.id
  const mealFoods = await MealFood.findAll({
    where: {
      mealId: id
    }
  });

  const meal = await Meal.findByPk(id)

  if (!meal) {
    const err = new Error("Meal not found")
    err.status = 404;
    err.errors = ["Meal couldn't be found"];
    return next(err)
  }

  const foodsInMeal = []
  for (let i = 0; i < mealFoods.length; i++) {
    for (let j = 0; j < mealFoods[i].quantity; j++) {
      const food = await Food.findByPk(mealFoods[i].foodId)
      foodsInMeal.push(food)
    }
  }
  return res.json(foodsInMeal)
})


// Create a new meal with multiple food items
router.post('/', async (req, res, next) => {
  const { mealName, foods, meals } = req.body;
  const { user } = req;

  const newMeal = await Meal.create({
    mealName,
    userId: user.id,
  });

  for (const food of foods) {
    const mealFood = await MealFood.findOne({
      where: {
        mealId: newMeal.id,
        foodId: food.id
      }
    });

    if (mealFood) {
      mealFood.quantity++;
      await mealFood.save();
    } else {
      await MealFood.create({
        mealId: newMeal.id,
        foodId: food.id,
        quantity: food.DiaryLogFood.quantity
      });
    }
  }

  for (const meal of meals) {
    for (let i = 0; i < meal.DiaryLogMeal.quantity; i++) {
      for (const food of meal.Food) {
        const mealFood = await MealFood.findOne({
          where: {
            mealId: newMeal.id,
            foodId: food.id
          }
        });

        if (mealFood) {
          for (let j = 0; j < food.MealFood.quantity; j++){
            mealFood.quantity++;
          }
          await mealFood.save();
        } else {
          await MealFood.create({
            mealId: newMeal.id,
            foodId: food.id,
            quantity: food.MealFood.quantity
          });
        }
      }
    }
  }

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
    await targetMeal.save();
    return res.json(targetMeal);
  } else {
    const err = new Error("Unauthorized")
    err.status = 403;
    err.errors = ['Current user is unauthorized']
    return next(err)
  }
});

// remove a food from a meal
router.delete('/:mealId/foods/:foodId', requireAuth, async (req, res, next) => {
  const { mealId, foodId } = req.params;
  const userId = req.user.id;

  const targetMeal = await Meal.findByPk(mealId);

  if (!targetMeal) {
    const err = new Error("Meal not found")
    err.status = 404;
    err.errors = ["Meal couldn't be found"];
    return next(err)
  }

  if (targetMeal.userId !== userId) {
    const err = new Error("Unauthorized")
    err.status = 403;
    err.errors = ['Current user is unauthorized']
    return next(err)
  }

  const mealFood = await MealFood.findOne({
    where: { mealId, foodId },
  });

  if (!mealFood) {
    const err = new Error("Meal food not found")
    err.status = 404;
    err.errors = ["Meal food couldn't be found"];
    return next(err)
  }

  if (mealFood.quantity > 1) {
    mealFood.quantity--;
    await mealFood.save();
  } else {
    await mealFood.destroy();
  }

  const updatedMeal = await Meal.findByPk(mealId);
  return res.json(updatedMeal);

});

//delete a meal
router.delete('/:mealId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { mealId } = req.params;

  const doomedMeal = await Meal.findByPk(mealId);

  if (!doomedMeal) {
    const err = new Error("Meal couldn't be found");
    err.status = 404;
    err.errors = ["Meal couldn't be found"];
    return next(err)
  }

  if (doomedMeal.userId === user.id) {
    await doomedMeal.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: res.statusCode
    })
  } else {
    const err = new Error("Unauthorized");
    err.status = 403;
    err.errors = ["Current user is unauthorized"];
    return next(err)
  }
});


module.exports = router;
