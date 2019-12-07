// TODO: Address should be on another table where we can save Street address, Area, City etc separately
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "user",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "user",
    }
  );
  return User;
};