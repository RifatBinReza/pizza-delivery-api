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
  User.associate = (models)=> {
    models.User.hasMany(models.Order, {targetKey: 'customer_id'})
  };
  return User;
};