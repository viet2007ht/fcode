const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");
module.exports = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    avatar_url: { type: DataTypes.STRING },
    role: {
      type: DataTypes.ENUM("student", "teacher", "admin"),
      defaultValue: "student",
    },
    bio: { type: DataTypes.TEXT },
  },
  { timestamps: true, underscored: true }
);
