import jwt from "jsonwebtoken";

export const createAccessToken = (options = {}) => {
  const token = jwt.sign(options, "1234", {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
};

export const createRefereshToken = (options = {}) => {
  const token = jwt.sign(options, "1234", {
    algorithm: "HS256",
    expiresIn: "5d",
  });
  return token;
};

export const validateToken = (token) => {
  try {
    const tokenAfterValidation = jwt.verify(token, "1234");
    return { success: true, data: tokenAfterValidation };
  } catch (error) {
    return { success: false, data: null, message: error.message };
  }
};
