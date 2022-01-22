const express = require('express');
const FoodDiaryRouter = require('./routes/fooddiary');
const MealRouter = require('./routes/meal');
const UserRouter = require('./routes/user');
const AuthRouter = require('./routes/auth');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'))

app.use('/fooddiary', FoodDiaryRouter);
app.use('/meal', MealRouter);
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);

module.exports = app;
