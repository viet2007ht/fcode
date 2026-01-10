const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "LessonProgress",
  {
    progress_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    last_watched_second: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { timestamps: true, underscored: true }
);
