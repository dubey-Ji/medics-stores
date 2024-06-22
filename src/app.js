import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
import { config as dotenvConfig } from "dotenv";
export const APP_PATH = dirname(fileURLToPath(import.meta.url));
const dotEnvPath = join(APP_PATH, "..", `.development.env`);
dotenvConfig({ path: dotEnvPath });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// export { app, APP_PATH };
