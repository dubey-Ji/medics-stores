import express from "express";
import authRouter from "./authentication.route.js";
import storeRouter from "./store.route.js";
import customerRouter from "./customer.route.js";
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.status(200).json({ success: true, message: "pong" });
});

router.use("/auth", authRouter);
router.use("/", storeRouter);
router.use("/customer", customerRouter);

export default router;
