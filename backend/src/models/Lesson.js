const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "Lesson",
  {
    lesson_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content_type: {
      type: DataTypes.ENUM("video", "document", "quiz"),
      defaultValue: "video",
    },
    video_url: { type: DataTypes.STRING },
    content_text: { type: DataTypes.TEXT },
    duration_seconds: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_preview: { type: DataTypes.BOOLEAN, defaultValue: false },
    order_index: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { timestamps: false, underscored: true }
);
