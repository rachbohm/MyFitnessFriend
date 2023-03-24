const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const foodsRouter = require('./foods.js');
const mealsRouter = require('./meals.js');
const diaryLogsRouter = require('./diaryLogs.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/foods', foodsRouter);
router.use('/meals', mealsRouter);
router.use('/diaryLogs', diaryLogsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
