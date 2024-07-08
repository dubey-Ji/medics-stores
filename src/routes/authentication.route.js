import express from "express";
import { validateData } from "../middlewares/validatedata.middlware.js";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import Authentication from "../controller/authenctication.controller.js";

const router = express.Router();

router.post("/register", validateData, Authentication.register);

router.get("/verify-email/:token", Authentication.verifyEmailToken);

router.post("/login", Authentication.login);

router.get("/logout", isAuthenticated, Authentication.logout);

export default router;
