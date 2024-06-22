import winston from "winston";

const { errors, json, timestamp, combine, prettyPrint } = winston.format;

winston.loggers.add("RequestLogger", {
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [
    new winston.transports.File({ filename: "./logs/request.logs" }),
    new winston.transports.Console(),
  ],
  defaultMeta: { service: "Request Service" },
});
