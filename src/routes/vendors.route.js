import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import vendorsController from "../controller/vendors.controller.js";

const router = Router();

router.get("/", isAuthenticated, vendorsController.fetch);
router.post("/", isAuthenticated, vendorsController.add);

export default router;
