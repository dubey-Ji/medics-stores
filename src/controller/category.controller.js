import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Category as CategoryModel } from "../models/category.models.js";

const Category = {};

Category.fetch = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll({
      where: {
        is_active: true,
      },
    });
    if (!categories || categories.length === 0) {
      console.log(`\n No Categories found`);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No category found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, categories, "Fetched successfully"));
  } catch (error) {
    console.error(`\n Error occured while fetching the category`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Category.add = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      console.log(`\n Name is required field`);
      return res.status(400).json(new ApiError(400, "Name is required field"));
    }
    await CategoryModel.create({
      name,
      description: description || null,
      is_active: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Created successfully"));
  } catch (error) {
    console.error(`\n An error occured while adding the category --> ${error}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

export default Category;
