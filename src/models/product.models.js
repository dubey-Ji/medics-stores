import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Vendors } from "./vendors.models.js";
import { Category } from "./category.models.js";

export const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    vendor_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "product" }
);

Product.belongsTo(Vendors, {
  foreignKey: "vendors_id",
});
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
