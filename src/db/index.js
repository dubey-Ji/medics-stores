import { Sequelize } from "sequelize";
import { config } from "./development.config.js";

export const sequelize = new Sequelize({
  database: config.database,
  username: config.user,
  password: config.password,
  dialect: config.dialect,
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    await sequelize.sync({
      force: false,
      logging: config.logging,
      alter: true,
    });
    console.log("All models were synchronized successfully.");
    return;
  } catch (error) {
    console.error("\n Unable to connect to database: ", error.message);
    process.exit(1);
  }
};
