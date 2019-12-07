module.exports = (Sequelize, DataTypes) => {
  const Order = Sequelize.define(
    "order",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size: {
        type: DataTypes.ENUM,
        values: ["small", "medium", "large"],
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ordered_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      delivery_status: {
        type: DataTypes.ENUM,
        values: ["new", "preparing", "delivering", "delivered"],
        allowNull: false,
        defaultValue: "new",
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "order"
    }
  );
  Order.associate = (models)=> {
    models.Order.belongsTo(models.User, {foreignKey: "ordered_by"})
  };
  return Order;
};