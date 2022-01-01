module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
  };

  const MealModel = connection.define('Meal', schema);
  return MealModel;
};