import { Category } from "../models/category.models.js";
import { Product as ProductModel } from "../models/product.models.js";
import { Vendors } from "../models/vendors.models.js";
import { ProductStoreMapping } from "../models/product_store_mapping.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import _ from "underscore";

const Product = {};

Product.fetchProducts = async (req, res) => {
  try {
    const { storeId } = req.query;
    const productStoreMapping = await ProductStoreMapping.findAll({
      where: {
        store_id: storeId,
      },
    });
    if (productStoreMapping.length === 0) {
      console.log(`\n No product found`);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No Product found"));
    }
    const productIds = _.pluck(productStoreMapping, "product_id");
    const products = await ProductModel.findAll({
      where: {
        id: productIds,
      },
    });
    if (products.length === 0) {
      console.log(
        `\n No product found even after having product id in product store mapping`
      );
      return res.status(400).json(new ApiError(400, "Something went wrong"));
    }
    return res.status(200).json(new ApiResponse(200, products, "Product list"));
  } catch (error) {
    console.error(`\n Error occured while fetching the products --> ${error}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

Product.addProducts = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      category,
      vendor,
      stock,
      vendorPrice,
      price,
      storeId,
      status,
    } = req.body;
    if (
      !title ||
      !description ||
      !category ||
      !vendor ||
      !stock ||
      !vendorPrice ||
      !price ||
      !storeId ||
      !status
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const tags = req.body.tags;
    const existingCategory = await Category.findOne({
      where: {
        name: category,
      },
      attributes: ["id"],
    });

    if (!existingCategory) {
      console.log(`\n No category found for product`);
      return res.status(400).json(new ApiError(400, "No category found"));
    }
    const existingVendor = await Vendors.findOne({
      where: {
        name: vendor,
      },
      attributes: ["id"],
    });

    if (!existingVendor) {
      console.log(`\n No Vendor found`);
      return res.status(400).json(new ApiError(400, "No vendor found"));
    }
    const uniqueId = name + "-" + existingVendor.id + "-" + existingCategory.id;
    const existingProduct = await ProductModel.findOne({
      where: {
        unique_id: uniqueId,
      },
    });

    if (existingProduct) {
      console.log(`\n Product already exist`);
      return res.status(400).json(new ApiError(400, "Product all ready exist"));
    }
    await ProductModel.create({
      name: name,
      title,
      description,
      vendors_id: existingVendor.id,
      category_id: existingCategory.id,
      stock,
      vendor_price: vendorPrice,
      price,
      unique_id: uniqueId,
      is_active: true,
      tags: tags || null,
      status,
    });
    const product = await ProductModel.findOne({
      where: {
        unique_id: uniqueId,
      },
    });

    await ProductStoreMapping.create({
      store_id: storeId,
      product_id: product.id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product created successfully"));
  } catch (error) {
    console.error(`\n Error occured while fetching the products --> ${error}`);
    return res.status(400).json(new ApiError(400, "Something went wrong"));
  }
};

export default Product;
