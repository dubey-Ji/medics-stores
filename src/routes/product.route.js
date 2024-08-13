import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import Product from "../controller/Product.controller.js";

const router = Router();

router.post("/add-product", isAuthenticated, Product.addProducts);

router.get("fetch-product", isAuthenticated, Product.fetchProducts);

export default router;
