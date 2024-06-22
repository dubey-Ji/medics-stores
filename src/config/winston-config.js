import winston from "winston";
// import { APP_PATH } from "../app.js";
// console.log(APP_PATH);

const options = {
  file: {
    level: "info",
    filename: "./logs/app.logs",
    handleExceptions: true,
    maxSize: 5242880, // 5mb,
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};
export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
