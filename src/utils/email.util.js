import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { config } from "../config/development-config.js";
const transporter = nodemailer.createTransport({
  service: config.mail.service,
  pool: true,
  host: config.mail.host,
  port: config.mail.port,
  secure: false,
  requireTLS: true,
  auth: {
    user: config.mail.username,
    pass: config.mail.password,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

export const sendEmail = async function (options = {}) {
  const { to, cc, subject } = options;
  const token = await generateTokenForEmail({ email: to });
  const info = await transporter.sendMail({
    from: "support@medicsstores.com",
    to: to,
    subject: subject,
    html: `<b>Hello World</b><br><h1>Token: ${token}</h1>`,
  });
  return info;
};

export const generateTokenForEmail = async function (userInfo = {}) {
  const token = jwt.sign(
    {
      email: userInfo.email,
    },
    "1234",
    {
      algorithm: "HS256",
      expiresIn: config.mail.token_expire,
    }
  );
  return token;
};

export const verifyEmailToken = async function (token) {
  try {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return { sucess: true, data: userData };
  } catch (error) {
    console.error(`\n Error while verifing email token: ${error.message}`);
    return { sucess: false, data: null };
  }
};

export const readEmail = async function () {};
