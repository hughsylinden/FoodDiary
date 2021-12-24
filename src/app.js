const express = require('express');
const FoodDiaryRouter = require('./routes/fooddiary');

const app = express();
app.use(express.json());

app.use('/fooddiary', FoodDiaryRouter);

module.exports = app;
