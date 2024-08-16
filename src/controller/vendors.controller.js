import { ApiError } from "../utils/api-error.js";
import { Vendors as VendorsModel } from "../models/vendors.models.js";
import { ApiResponse } from "../utils/api-response.js";
import _ from "underscore";
import { ProductStoreMapping } from "../models/product_store_mapping.js";
import { Product } from "../models/product.models.js";

const Vendors = {};

Vendors.add = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json(new ApiError(400, "Name is required"));
    }
    await VendorsModel.create({
      name,
      is_active: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Created successfully"));
  } catch (error) {
    console.error(`\n Error occured while adding vendors --> ${error}`);
  }
};

Vendors.fetch = async (req, res) => {
  try {
    console.log("inisde vendors fetch");
    const vendors = await VendorsModel.findAll({
      where: {
        is_active: true,
      },
    });
    if (!vendors) {
      console.log(`\n No vendors found`);
      return res.status(400).json(new ApiError(400, "No vendor found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, vendors, "Fetched successfully"));
  } catch (error) {}
};

export default Vendors;
