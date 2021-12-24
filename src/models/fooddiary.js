module.exports = (connection, DataTypes) => {
  const schema = {
    user: DataTypes.STRING,
    //meals: DataTypes.STRING,
  };

  const FoodDiaryModel = connection.define('FoodDiary', schema);
  return FoodDiaryModel;
};