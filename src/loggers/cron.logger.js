import winston from "winston";

const { json, timestamp, prettyPrint, errors, combine } = winston.format;

winston.loggers.add("CronLogger", {
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [
    new winston.transports.File({
      filename: "./logs/cron.logs",
    }),
    new winston.transports.Console(),
  ],
});
