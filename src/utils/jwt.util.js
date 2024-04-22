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
