const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "Chapter",
  {
    chapter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    order_index: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { timestamps: false, underscored: true }
);
