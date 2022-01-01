const Sequelize = require('sequelize');
const FoodDiaryModel = require('./fooddiary');
const MealModel = require('./meal');
const UserModel = require('./user');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  const FoodDiary = FoodDiaryModel(connection, Sequelize);
  const Meal = MealModel(connection, Sequelize);
  const User = UserModel(connection, Sequelize);

  FoodDiary.hasMany(Meal);
  Meal.belongsTo(FoodDiary);
  User.hasMany(FoodDiary);
  FoodDiary.belongsTo(User);


  connection.sync({ alter: true });
  return {
    FoodDiary,
    Meal,
    User
  };
};

module.exports = setupDatabase();