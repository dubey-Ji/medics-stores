import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const UserOnBoardType = sequelize.define(
  "UserOnBoardType",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onboard_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "user_onboard_type" }
);
