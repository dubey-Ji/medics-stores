import { User } from "./user.models.js";
import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Store = sequelize.define(
  "Store",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "store" }
);
Store.belongsTo(User, {
  foreignKey: "user_id",
});
