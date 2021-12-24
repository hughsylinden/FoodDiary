const FoodDiaryController = require('../controllers/fooddiary');
const express = require('express');

const FoodDiaryRouter = express.Router();

FoodDiaryRouter.post('/', FoodDiaryController.create);
FoodDiaryRouter.get('/', FoodDiaryController.read);
FoodDiaryRouter.get('/:id', FoodDiaryController.readOne);
FoodDiaryRouter.patch('/:id', FoodDiaryController.update);
FoodDiaryRouter.delete('/:id', FoodDiaryController.destroy);

module.exports = FoodDiaryRouter;
