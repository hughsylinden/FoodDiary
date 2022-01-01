module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
  };

  const FoodDiaryModel = connection.define('FoodDiary', schema);
  return FoodDiaryModel;
};