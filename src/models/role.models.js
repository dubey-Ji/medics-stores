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

// Role.afterSync(async (options) => {
//   const ROLES = [
//     {
//       name: "STOREOWNER",
//     },
//     {
//       name: "CUSTOMER",
//     },
//   ];
//   const count = await Role.count();
//   if (count !== ROLES.length) {
//     await Role.truncate();
//     await Role.bulkCreate(ROLES);
//   }
// });
// main()
