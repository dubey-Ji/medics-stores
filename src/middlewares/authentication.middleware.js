import { ApiError } from "../utils/api-error.js";
import { validateToken } from "../utils/jwt.util.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const isTokenValid = validateToken(token);
    if (!isTokenValid.success)
      return res.status(401).json(new ApiError(401, "Unathorized"));
    req.user = {};
    req.user.email = isTokenValid.data.email;
    next();
  } catch (error) {
    throw error;
  }
};
