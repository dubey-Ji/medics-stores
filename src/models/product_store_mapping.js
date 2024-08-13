import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const ProductStoreMapping = sequelize.define(
  "ProductStoreMapping",
  {
    product_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  { tableName: "product_store_mapping", timestamps: true }
);
