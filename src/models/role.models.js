import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "role" }
);

async function main() {
  try {
    const roles = await Role.findAll({});
    if (roles && roles.length === 0) {
      const ROLES = [
        {
          name: "STOREOWNER",
        },
        {
          name: "CUSTOMER",
        },
      ];
      await Role.create(ROLES[0]);
      await Role.create(ROLES[1]);
    }
    return;
  } catch (error) {}
}
// main()
