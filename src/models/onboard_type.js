import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const OnboardType = sequelize.define(
  "OnboardType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "onboard_type" }
);
OnboardType.afterSync(async (options) => {
  const types = [
    {
      name: "google",
    },
    {
      name: "facebook",
    },
    {
      name: "email",
    },
  ];
  const count = await OnboardType.count();
  if (count !== types.length) {
    await OnboardType.truncate();
    await OnboardType.bulkCreate(types);
  }
});
