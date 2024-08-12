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
    vendors_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        key: "id",
        model: Vendors,
      },
    },
    category_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        key: "id",
        model: Category,
      },
    },
  },
  { timestamps: true, tableName: "product" }
);

Product.belongsTo(Vendors);
Product.belongsTo(Category);
Category.hasMany(Product);
Vendors.hasMany(Product);
