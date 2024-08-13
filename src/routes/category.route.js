import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import categoryController from "../controller/category.controller.js";

const router = Router();

router.get("/", isAuthenticated, categoryController.fetch);
router.post("/", isAuthenticated, categoryController.add);

export default router;
