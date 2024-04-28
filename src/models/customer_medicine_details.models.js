import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { User } from "./user.models.js";

export const CustomerMedicineDetails = sequelize.define(
  "CustomerMedicineDetails",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_no_of_tablets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tablets_no_of_weeks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tablets_no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_tablets_remaining: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "customer_medicine_details" }
);
CustomerMedicineDetails.belongsTo(User, {
  foreignKey: "customer_id",
});
