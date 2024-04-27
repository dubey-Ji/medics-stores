import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const CustomerStoreMapping = sequelize.define(
  "CustomerStoreMapping",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "customer_store_mapping" }
);
