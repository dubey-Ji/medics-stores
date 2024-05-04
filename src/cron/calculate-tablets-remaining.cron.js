import { app } from "../engines/load-engines.js";
import "../loggers/cron.logger.js";
import winston from "winston";
const CronLogger = winston.loggers.get("CronLogger");
const cronName = "Calculate Tablets Remaining";

// There is some issue in cronlogger

function main() {
  setTimeout(() => {
    // CronLogger.info({
    //   pid: process.pid,
    //   status: "Started",
    //   cronName,
    // });
    app.engines
      .calculateTabletsRemaining()
      .then(() => {
        exitWithSuccess();
      })
      .catch((e) => {
        return exitWithError(e);
      });
  }, 2000);
}

function exitWithSuccess() {
  // CronLogger.info({
  //   pid: process.pid,
  //   status: "Success",
  //   cronName,
  // });
  process.exit(0);
  // add console log and store it into file
}

function exitWithError(e) {
  // CronLogger.error({
  //   pid: process.pid,
  //   status: "Error",
  //   cronName,
  //   error: e,
  // });
  process.exit(1);
}

main();
