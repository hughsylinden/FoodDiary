const Sequelize = require('sequelize');
const FoodDiaryModel = require('./fooddiary');
const MealModel = require('./meal');
const UserModel = require('./user');

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT, CLEARDB_DATABASE_URL } = process.env;

const setupDatabase = () => {
  const connection = CLEARDB_DATABASE_URL ? 
    new Sequelize(CLEARDB_DATABASE_URL) :
    new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
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