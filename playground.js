import {
  generateTokenForEmail,
  verifyEmailToken,
  sendEmail,
} from "./src/utils/email.js";

let token = await generateTokenForEmail({ email: "ashutosh@gmail.com" });
// console.log(await verifyEmailToken(token));
console.log("token", token);
// sendEmail({ to: "ashd1014@gmail.com", subject: "Test Email" })
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
