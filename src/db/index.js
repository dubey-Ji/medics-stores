import { Sequelize } from "sequelize";
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
      force: false,
      logging: false,
      alter: true,
    });
    console.log("All models were synchronized successfully.");
    return;
  } catch (error) {
    console.error("\n Unable to connect to database: ", error);
    process.exit(1);
  }
};
