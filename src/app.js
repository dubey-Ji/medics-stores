import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
import { config as dotenvConfig } from "dotenv";
export const APP_PATH = dirname(fileURLToPath(import.meta.url));
const dotEnvPath = join(APP_PATH, "..", `.development.env`);
dotenvConfig({ path: dotEnvPath });
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// export { app, APP_PATH };
