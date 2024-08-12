import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Vendors = sequelize.define(
  "Vendors",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "vendors" }
);
