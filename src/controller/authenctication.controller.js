import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { sendEmail, verifyEmailToken } from "../utils/email.util.js";
import { comparePassword, encryptPassword } from "../utils/bcrypt.util.js";
import { createAccessToken, createRefereshToken } from "../utils/jwt.util.js";
import { UserRoleMapping } from "../models/user_role_mapping.models.js";
import { Role } from "../models/role.models.js";
import { OnboardType } from "../models/onboard_type.js";
import { UserOnBoardType } from "../models/user_onboard_type.js";
import axios from "axios";
import qs from "qs";

const Authentication = {};

Authentication.register = async (req, res) => {
  try {
    let { email, name, phoneNumber, password } = req.body;
    phoneNumber = +phoneNumber;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) throw new ApiError(400, "User already exist");
    const hashPassword = await encryptPassword(password);
    const user = await User.create({
      email,
      name,
      phoneNumber,
      password: hashPassword,
    });
    const role = await Role.findOne({ where: { name: "STOREOWNER" } });
    await UserRoleMapping.create({
      user_id: user.id,
      role_id: role.id,
    });
    /* TODO: Will verify the email after the user gets onboarded, will give him an option inside settings
    option in setting
    await sendEmail({
      to: email,
      subject: "Email Verification",
    });
    */
    // TODO: Test the below onboard configuration
    const onboardType = await OnboardType.findOne({
      where: {
        name: "email",
      },
    });
    if (!onboardType) {
      throw new ApiError(400, "Not a valid onboard type");
    }
    await UserOnBoardType.create({
      user_id: user.id,
      onboard_id: onboardType.id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, [], "User created successfully"));
  } catch (error) {
    console.error(`\n An error occured while register --> ${error}`);
    // throw new ApiError(400, "Something went wrong", error.message);
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      await user.destroy();
    }
    return res.status(400).json(new ApiError(400, error.message));
  }
};

Authentication.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json(new ApiError(401, "Not a valid data", [], false));
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user)
      return res
        .status(401)
        .json(new ApiError(401, "No user found", [], false));
    const userOnBoardType = await UserOnBoardType.findOne({
      where: {
        user_id: user.id,
      },
    });
    if (!userOnBoardType) {
      return res
        .status(401)
        .json(new ApiError(401, "Something went wrong", [], false));
    }
    const onBoardType = await OnboardType.findOne({
      where: {
        id: userOnBoardType.onboard_id,
      },
    });
    if (!onBoardType) {
      return res
        .status(401)
        .json(new ApiError(401, "Something went wrong", [], false));
    }
    if (onBoardType.name !== "email")
      return res
        .status(401)
        .json(new ApiError(401, "Not a valid login", [], false));
    const isPasswordCorrect = await comparePassword(user.password, password);
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json(new ApiError(401, "Please provide correct data", [], false));
    // create accesstoken and referesh token and share it in response with user data removing its password
    const accesstoken = createAccessToken({ email });
    const refereshToken = createRefereshToken({ email });
    user.accessToken = accesstoken;
    user.refereshToken = refereshToken;
    await user.save();
    delete user.dataValues.password;
    res.cookie("authToken", accesstoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: user, path: "/home" },
          "Login successfully"
        )
      );
  } catch (error) {
    console.error(`\n An error occured while login --> ${error}`);
    return res
      .status(401)
      .json(new ApiError(401, "Something went wrong", [], false));
  }
};

Authentication.logout = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ where: { email } });
    user.accessToken = null;
    user.refereshToken = null;
    await user.save();
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, { path: "/login" }, "User logout successfully")
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something went wrong", error));
  }
};

Authentication.sendTokenToEmail = async (req, res) => {
  try {
    const email = req.user.email;
    await sendEmail({
      to: email,
      subject: "Email Verification",
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Verification email has been sent"));
  } catch (error) {
    console.error(`\n Error occrued while sending token to email --> ${error}`);
    return res
      .status(400)
      .json(new ApiError(401, "Something went wrong", error));
  }
};

Authentication.verifyEmailToken = async (req, res) => {
  try {
    const token = req.params.token;
    const result = await verifyEmailToken(token);
    if (!result.sucess)
      return res.status(400).json(new ApiError(400, "Email Not valid"));
    const user = await User.findOne({
      where: { email: result.data.email },
    });
    if (!user)
      return res.status(400).json(new ApiError(400, "Something went wrong"));
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json(new ApiResponse(200, [], "Email is valid"));
  } catch (error) {
    console.error(`\n Error occured while verifying email ${error.message}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Authentication.googleOauthRegisteration = async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post(
      process.env.GOOGLE_TOKEN_URI,
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      })
    );
    const tokenResponse = response;
    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(process.env.GOOGLE_USER_INFO_URI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const body = userInfoResponse.data;
    const userExist = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (userExist)
      return res.status(400).json(new ApiError(400, "User already exist"));
    const user = await User.create({
      email: body.email,
      name: body.name,
      phoneNumber: 91,
      isEmailVerified: body.verified_email,
    });
    const role = await Role.findOne({ where: { name: "STOREOWNER" } });
    await UserRoleMapping.create({
      user_id: user.id,
      role_id: role.id,
    });
    const onboardType = await OnboardType.findOne({
      where: {
        name: "google",
      },
    });

    if (!onboardType) {
      throw new ApiError(400, "Not a valid onboard type");
    }
    await UserOnBoardType.create({
      user_id: user.id,
      onboard_id: onboardType.id,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          path: "/login",
        },
        "User created successfully"
      )
    );
  } catch (error) {
    console.error(
      `\n Error occured while registering user with google oauth --> ${error}`
    );
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      await user.destroy();
    }
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Authentication.googleOauthLogin = async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post(
      process.env.GOOGLE_TOKEN_URI,
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      })
    );
    const tokenResponse = response;
    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(process.env.GOOGLE_USER_INFO_URI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const body = userInfoResponse.data;
    const userExist = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (!userExist) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }

    const accesstoken = createAccessToken({ email: body.email });
    const refereshToken = createRefereshToken({ email: body.email });
    userExist.accessToken = accesstoken;
    userExist.refereshToken = refereshToken;
    res.cookie("authToken", accesstoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    await userExist.save();
    delete userExist.dataValues.password;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: userExist, path: "/home" },
          "Login successfully"
        )
      );
  } catch (error) {
    console.error(
      `\n Error occured while login user with google oauth --> ${error}`
    );
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

export default Authentication;
