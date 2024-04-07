import express from "express";
import { ApiResponse } from "../utils/api-response.js";
import { validateData } from "../middlewares/validatedata.middlware.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { sendEmail, verifyEmailToken } from "../utils/email.util.js";

const router = express.Router();

router.post("/register", validateData, async (req, res) => {
  try {
    const { email, name, phoneNumber, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exist");
    const user = await User.create({
      email,
      name,
      phoneNumber,
      password,
    });
    const emailVerificaion = await sendEmail({
      to: email,
      subject: "Email Verification",
    });
    res.status(200).json(new ApiResponse(200, [], "true"));
  } catch (error) {
    // throw new ApiError(400, "Something went wrong", error.message);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      await user.delete();
    }
    console.error(error);
  }
});

router.get("/verify-email/:token", async (req, res) => {
  const token = req.params.token;
  const result = await verifyEmailToken(token);
  if (!result)
    return res.status(400).json(new ApiError(400, "Email Not valid"));
  return res.status(200).json(new ApiResponse(200, [], "Email is valid"));
});

export default router;
