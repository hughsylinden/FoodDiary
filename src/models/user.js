module.exports = (connection, DataTypes) => {
  const schema = {  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    password: DataTypes.STRING,    
  };

  const UserModel = connection.define('User', schema);
  return UserModel;
};