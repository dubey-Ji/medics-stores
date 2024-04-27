import { Router } from "express";
import { User } from "../models/user.models.js";
import { Role } from "../models/role.models.js";
import { UserRoleMapping } from "../models/user_role_mapping.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { CustomerMedicineDetails } from "../models/customer_medicine_details.models.js";
import { CustomerStoreMapping } from "../models/customer_store_mapping.js";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
const router = Router();

router.post("/create-customer", isAuthenticated, async (req, res) => {
  try {
    const { email, name, phoneNumber, storeId } = req.body;
    const existingUser = await User.findOne({
      where: {
        phoneNumber,
      },
    });
    if (existingUser) throw new ApiError(400, "Number already exist");
    const user = await User.create({
      email,
      name,
      phoneNumber,
    });
    const role = await Role.findOne({ where: { name: "CUSTOMER" } });
    await UserRoleMapping.create({
      user_id: user.id,
      role_id: role.id,
    });
    await CustomerStoreMapping.create({
      customer_id: user.id,
      store_id: storeId,
    });
    return res.status(200).json(new ApiResponse(200, [], "true"));
  } catch (error) {
    console.error(`\n Error occured while creating customer: ${error.message}`);
    // throw new ApiError(400, "Something went wrong", error.message);
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      await user.destroy();
    }
    res.status(400).json(new ApiError(400, error.message));
  }
});

router.post("/customer-details", isAuthenticated, async (req, res) => {
  try {
    const {
      medicineName,
      customerId,
      totalNoOfTablets,
      tabletsNoOfWeeks,
      tabletsNoOfDays,
    } = req.body;

    await CustomerMedicineDetails.create({
      name: medicineName,
      total_no_of_tablets: totalNoOfTablets,
      tablets_no_of_weeks: tabletsNoOfWeeks ? tabletsNoOfWeeks : null,
      tablets_no_of_days: tabletsNoOfDays ? tabletsNoOfDays : null,
      customer_id: customerId,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "Customer Medicine Created Successfully")
      );
  } catch (error) {
    console.error(
      `\n Error occured while creating customer medicine details: ${error.message}`
    );
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
});

export default router;
