import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
const APP_PATH = dirname(fileURLToPath(import.meta.url));
const dotEnvPath = join(APP_PATH, "..", ".env");
console.log(dotEnvPath);
dotenvConfig({ path: dotEnvPath });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// import routes
import router from "./routes/router.js";

app.use("/api/v1", router);

// console.log(APP_PATH);
export { app, APP_PATH };
