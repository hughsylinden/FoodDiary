module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    dailyCalorieTarget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const FoodDiaryModel = connection.define('FoodDiary', schema);
  return FoodDiaryModel;
};