import { ApiError } from "../utils/api-error.js";
import { isEmail, isValidIndianMobileNumber } from "../utils/validate-data.js";

export const validateData = (req, res, next) => {
  const { email, phoneNumber, password, name } = req.body;
  if (!email || !phoneNumber || !password || !name) {
    throw new ApiError(400, "All fields are required");
  } else if (isEmail(email) && isValidIndianMobileNumber(phoneNumber)) {
    next();
  } else {
    throw new ApiError(400, "Not a valid data");
  }
};
