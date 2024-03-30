import express from "express";
import authRouter from "./authentication.route.js";
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.status(200).json({ success: true, message: "pong" });
});

router.use("/auth", authRouter);

export default router;
