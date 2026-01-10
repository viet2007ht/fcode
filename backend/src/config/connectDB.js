const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: "+07:00",
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.error("Connect failed:", error);
  }
};

module.exports = { sequelize, connectDB };
