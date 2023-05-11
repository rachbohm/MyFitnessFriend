const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Food, Meal, MealFood, DiaryLog } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const fetch = require('node-fetch');

const router = express.Router();

//get search results from external API for a search term
router.get('/:searchTerm', requireAuth, async (req, res, next) => {
  const { searchTerm } = req.params;
  const results = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${searchTerm}`, {
    method: "GET",
    headers: {
      "x-app-id": '9bf4a516',
      "x-app-key": '0daf84f02266486023b2f4f99069baf8'
    }
  })
  const data = await results.json();
  console.log('~~~~~~~~~~~~~~data', data)


  return res.json(data);
});

//get nutrition information for a common food item
router.get('/common/:food_name', requireAuth, async (req, res, next) => {
  const { food_name } = req.params;
  const results = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: "POST",
    headers: {
      "x-app-id": '9bf4a516',
      "x-app-key": '0daf84f02266486023b2f4f99069baf8',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "query": food_name })
  });

  const data = await results.json();
  console.log('data', data);
  return res.json(data);

});


module.exports = router;
