import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
const router = Router();
import Customer from "../controller/customer.controller.js";

router.post("/create-customer", isAuthenticated, Customer.createCustomer);

router.post("/customer-details", isAuthenticated, Customer.customerDetails);

export default router;
