const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "Enrollment",
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "refunded"),
      defaultValue: "active",
    },
    enrolled_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false, underscored: true }
);
