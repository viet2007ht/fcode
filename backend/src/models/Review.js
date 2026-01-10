const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "Review",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
  },
  { timestamps: true, underscored: true }
);
