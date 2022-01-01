const MealController = require('../controllers/meal');
const express = require('express');

const MealRouter = express.Router();

MealRouter.post('/', MealController.create);
MealRouter.get('/', MealController.read);
MealRouter.get('/:id', MealController.readOne);
MealRouter.patch('/:id', MealController.update);
MealRouter.delete('/:id', MealController.destroy);

module.exports = MealRouter;
