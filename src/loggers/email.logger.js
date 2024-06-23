import winston from "winston";

const { json, timestamp, prettyPrint, errors, combine } = winston.format;

const EmailLogger = winston.loggers.add("EmailLogger", {
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [
    new winston.transports.File({
      filename: "./logs/email.logs",
    }),
    new winston.transports.Console(),
  ],
});

export default EmailLogger;
