module.exports = (sequelize, DataTypes, Model) => {
  class Users extends Model {}

  Users.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, 
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return Users;
};
