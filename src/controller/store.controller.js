import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Store as StoreModel } from "../models/store.models.js";
import { User } from "../models/user.models.js";

const Store = {};

Store.fetchStore = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ where: { email } });
    const existingStore = await StoreModel.findAll({
      where: { user_id: user.id },
    });
    if (existingStore && existingStore.length === 0)
      res.status(400).json(new ApiError(400, "No found"));
    return res
      .status(200)
      .json(new ApiResponse(200, existingStore, "Store found successfully"));
  } catch (error) {
    console.error(`\n Error occured while fetching store: ${error.message}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Store.addStore = async (req, res) => {
  try {
    const email = req.user.email;
    const storeName = req.body.name;
    const user = await User.findOne({ where: { email } });
    const existingStore = await StoreModel.findOne({
      where: { user_id: user.id, name: storeName },
    });
    if (existingStore)
      res.status(400).json(new ApiError(400, "Store already exist"));
    const newStore = await StoreModel.create({
      name: storeName,
      user_id: user.id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, newStore, "Store created successfully"));
  } catch (error) {
    console.error(`\n Error occured while creation store: ${error.message}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

export default Store;
