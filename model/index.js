const Sequelize = require('sequelize')
/**
 * Connect to the database instance
 */
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    dialectOptions: {
      useUTC: true,
    }
  }
);

/**
 * Get all the models for exporting
 */
const models = {
  User: require("./user")(sequelize, Sequelize),
  Order: require("./order")(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});
module.exports = { sequelize, models };