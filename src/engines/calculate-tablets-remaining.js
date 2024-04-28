import { User } from "../models/user.models.js";
import { UserRoleMapping } from "../models/user_role_mapping.models.js";
import _ from "underscore";
import Promise from "bluebird";
import { CustomerMedicineDetails } from "../models/customer_medicine_details.models.js";
import moment from "moment";

/**
 *
 * @param {*} settings
 */
export const process = async (
  settings = { calculateAtNoOfDays: true, calculateAtNoOfWeeks: false },
  batchConcurrency = 10
) => {
  try {
    const customers = await fetchAllCustomers();
    console.log("customes length", customers.length);
    await Promise.map(customers, processBatch, {
      concurrency: batchConcurrency,
    });

    console.log("Success");
    return;
  } catch (error) {
    throw error;
  }
};

const processBatch = async (batch) => {
  try {
    const customer = batch;
    console.log("customer id", customer.id);
    const customerMedicineDetails = await CustomerMedicineDetails.findAll({
      where: { customer_id: customer.id },
    });
    await Promise.map(
      customerMedicineDetails,
      calculateTabletsRemainingForMedicine,
      { concurrency: 1 }
    );
    return;
  } catch (error) {
    throw error;
  }
};

const fetchAllCustomers = async () => {
  try {
    const customersId = await UserRoleMapping.findAll({
      where: { role_id: 2 },
      attributes: ["user_id"],
    });
    const id = _.pluck(customersId, "user_id");
    const customers = await User.findAll({
      where: {
        id,
      },
    });
    return customers;
  } catch (error) {
    throw error;
  }
};

const calculateTabletsRemainingForMedicine = async (medicineDetails) => {
  try {
    let remainingTablets;
    const tabletsNoOfDays = medicineDetails.tablets_no_of_days;
    const tabletsNoOfWeeks = medicineDetails.tablets_no_of_weeks;
    const totalNoOfTablets = medicineDetails.total_no_of_tablets;
    const medicineCreatedDate = moment(medicineDetails.createdAt).format(
      "YYYY-MM-DD"
    );

    if (tabletsNoOfDays) {
      remainingTablets = calculateTabletsForNoOfDays(
        totalNoOfTablets,
        tabletsNoOfDays,
        medicineCreatedDate
      );
    } else if (tabletsNoOfWeeks) {
      remainingTablets = calculateTabletsForNoOfWeeks(
        totalNoOfTablets,
        tabletsNoOfWeeks,
        medicineCreatedDate
      );
    }
    const medicine = await CustomerMedicineDetails.findOne({
      where: { id: medicineDetails.id },
    });
    medicine.total_tablets_remaining = remainingTablets;
    await medicine.save();
    return;
  } catch (error) {
    throw error;
  }
};

const calculateTabletsForNoOfDays = (
  totalNoOfTablets,
  tabletsNoOfDays,
  medicineCreatedDate
) => {
  try {
    const diffDay = moment().diff(medicineCreatedDate, "days");
    const remainingTablets = totalNoOfTablets - diffDay * tabletsNoOfDays;
    return remainingTablets;
  } catch (error) {
    throw error;
  }
};

const calculateTabletsForNoOfWeeks = (
  totalNoOfTablets,
  tabletsNoOfWeeks,
  medicineCreatedDate
) => {
  try {
    const diffWeek = moment().diff(medicineCreatedDate, "weeks");
    const remainingTablets = totalNoOfTablets - diffWeek * tabletsNoOfWeeks;
    if (remainingTablets < 0) {
      remainingTablets = 0;
    }
    return remainingTablets;
  } catch (error) {
    throw error;
  }
};
