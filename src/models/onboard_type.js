import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const OnboardType = sequelize.define(
  "OnboardType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "onboard_type" }
);
