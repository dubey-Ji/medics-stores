import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Tags = sequelize.define(
  "Tags",
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
  { timestamps: true, tableName: "tags" }
);
