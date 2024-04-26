import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const UserRoleMapping = sequelize.define(
  "UserRoleMapping",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "user_role_mapping" }
);
