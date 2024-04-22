import express from "express";
import { ApiResponse } from "../utils/api-response.js";
import { validateData } from "../middlewares/validatedata.middlware.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { sendEmail, verifyEmailToken } from "../utils/email.util.js";
import { comparePassword, encryptPassword } from "../utils/bcrypt.util.js";
import { createAccessToken, createRefereshToken } from "../utils/jwt.util.js";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/register", validateData, async (req, res) => {
  try {
    const { email, name, phoneNumber, password } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) throw new ApiError(400, "User already exist");
    const hashPassword = await encryptPassword(password);
    await User.create({
      email,
      name,
      phoneNumber,
      password: hashPassword,
    });
    await sendEmail({
      to: email,
      subject: "Email Verification",
    });
    res.status(200).json(new ApiResponse(200, [], "true"));
  } catch (error) {
    console.error(error);
    // throw new ApiError(400, "Something went wrong", error.message);
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      await user.destroy();
    }
    res.status(400).json(new ApiError(400, error.message));
  }
});

router.get("/verify-email/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const result = await verifyEmailToken(token);
    if (!result.sucess)
      return res.status(400).json(new ApiError(400, "Email Not valid"));
    const user = await User.findOne({ where: { email: result.data.email } });
    if (!user)
      return res.status(400).json(new ApiError(400, "Something went wrong"));
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json(new ApiResponse(200, [], "Email is valid"));
  } catch (error) {
    console.error(`\n Error occured while verifying email ${error.message}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) return res.status(400).json(new ApiError(400, "No user found"));
    const isPasswordCorrect = await comparePassword(user.password, password);
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json(new ApiError(401, "Please provide correct data"));
    // create accesstoken and referesh token and share it in response with user data removing its password
    const accesstoken = createAccessToken({ email });
    const refereshToken = createRefereshToken({ email });
    user.accessToken = accesstoken;
    user.refereshToken = refereshToken;
    await user.save();
    delete user.dataValues.password;
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Login successfully"));
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
});

router.get("/logout", isAuthenticated, async (req, res) => {
  try {
    // const email = req.body.user.email;
    const email = req.user.email;
    const user = await User.findOne({ where: { email } });
    user.accessToken = null;
    user.refereshToken = null;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User logout successfully"));
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something went wrong", error));
  }
});

export default router;
