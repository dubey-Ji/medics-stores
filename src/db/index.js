import { Sequelize } from "sequelize";

console.log("process.env.DB_TYPE", process.env.DB_TYPE);

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    await sequelize.sync({
      force: process.env.DB_FORCE,
      logging: process.env.DB_LOGGING,
      alter: process.env.DB_ALTER,
    });
    console.log("All models were synchronized successfully.");
    return;
  } catch (error) {
    console.error("\n Unable to connect to database: ", error.message);
    process.exit(1);
  }
};
