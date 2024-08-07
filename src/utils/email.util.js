import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { config } from "../config/development-config.js";
import { readFileSync } from "fs";
import _ from "underscore";
import EmailLogger from "../loggers/email.logger.js";
import { EMAIL_TEMPLATE_HTML_FILE_PATH } from "../constants.js";
import { APP_PATH } from "../app.js";
import { join } from "path";

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

export const sendEmail = async function (options = {}, templateOptions = {}) {
  let info;
  const { to, cc, subject } = options;
  try {
    EmailLogger.info({
      pid: process.pid,
      status: "Email Process Started",
      emailData: { to, subject },
    });
    const token = await generateTokenForEmail({ email: to });
    const tokenData = { token };
    const data = { ...templateOptions, ...tokenData };
    const filePath = fetchTemplatePath(options.fileType);
    info = await transporter.sendMail({
      from: "support@medicsstores.com",
      to: to,
      subject: subject,
      html: getCompiledHtml(filePath, data),
    });
    EmailLogger.info({
      pid: process.pid,
      status: "Email Process Finished",
      emailData: { to, subject, info },
    });
    return info;
  } catch (error) {
    EmailLogger.error({
      pid: process.pid,
      status: "Email Process Errored",
      emailData: { to, subject, info },
      error,
    });
    throw error;
  }
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

const getCompiledHtml = (templatePath, data) => {
  let encoding, templateContent;
  templateContent = readFileSync(templatePath, (encoding = "utf8"));
  let templatize = _.template(templateContent);
  return templatize(data);
};

const fetchTemplatePath = (type) => {
  const typeData = EMAIL_TEMPLATE_HTML_FILE_PATH.filter((template) => {
    return template.type === type;
  })[0];
  console.log(join(APP_PATH, typeData.path));
  return join(APP_PATH, typeData.path);
};
