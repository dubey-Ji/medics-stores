import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "medical_store",
  username: "ashutosh",
  password: "admin@123",
  dialect: "mysql",
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
  } catch (error) {
    console.error("\n Unable to connect to database: ", error.message);
    process.exit(1);
  }
};
