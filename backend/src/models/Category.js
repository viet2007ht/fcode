const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
  },
  { timestamps: false, underscored: true }
);
