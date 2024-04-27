import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refereshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isPhoneNumberVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { timestamps: true, tableName: "user" }
);
