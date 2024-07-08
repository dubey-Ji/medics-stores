import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import Store from "../controller/store.controller.js";

const router = Router();

router.get("/store", isAuthenticated, Store.fetchStore);

router.post("/store", isAuthenticated, Store.addStore);

export default router;
