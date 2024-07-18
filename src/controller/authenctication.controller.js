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
      return res.status(400).json(new ApiError(400, "Not a valid data"));
    }
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
    console.error(`\n An error occured while login --> ${error}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Authentication.logout = async (req, res) => {
  try {
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

export default Authentication;
