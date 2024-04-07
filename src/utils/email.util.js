import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { app } from "../app.js"; // imported to load dotenv configuration

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

export const sendEmail = async function (options = {}) {
  const { to, cc, subject } = options;
  const info = await transporter.sendMail({
    from: "support@medicsstores.com",
    to: to,
    subject: subject,
    cc: cc,
    html: "<b>Hello World</b>",
  });
  return info;
};

export const generateTokenForEmail = async function (userInfo = {}) {
  const token = jwt.sign(
    {
      email: userInfo.email,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.MAIL_TOKEN_EXPIRESIN,
    }
  );
  return token;
};

export const verifyEmailToken = async function (token) {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error(`\n Error while verifing email token: ${error.message}`);
    return false;
  }
};

export const readEmail = async function () {};
