import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

const AddProduct = function () {
  const [activeTab, setActiveTab] = useState("pricing");
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [tags, setTags] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    vendor: "",
    tags: "",
    vendorPrice: "",
    sellPrice: "",
    stock: 0,
  });
  const [activeOrganizeCategoryTab, setActiveOrganizeCategoryTab] =
    useState("category");
  const [activeOrganizeVendorTab, setActiveOrganizeVendorTab] =
    useState("vendor");
  const [newVendor, setNewVendor] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
      setSnackbarState({ message: "" });
    }, 1200);
  }, [showSnackbar]);

  // Fetch categories, vendors, tags
  const fetchCategories = async () => {
    try {
      const resp = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URI}/category`,
        withCredentials: true,
      });
      if (resp.data.success) {
        setCategories(resp.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };
  const fetchVendors = async () => {
    try {
      const resp = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URI}/vendors`,
        withCredentials: true,
      });
      if (resp.data.success) {
        setVendors(resp.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };
  const fetchTags = async () => {};
  const handleAddNewVendors = async () => {
    try {
      const resp = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URI}/vendors`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: newVendor,
        },
      });
      if (resp.data.success) {
        setShowSnackbar(true);
        setSnackbarState({
          success: resp.data.success,
          message: resp.data.message,
        });
      } else {
        setShowSnackbar(false);
        setSnackbarState({
          success: false,
          message: resp.data.message,
        });
      }
      fetchVendors();
      console.log("resp", resp);
      setNewVendor("");
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };
  const handleAddNewCategory = async () => {
    try {
      const resp = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URI}/category`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: newCategory,
        },
      });
      if (resp.data.success) {
        setShowSnackbar(true);
        setSnackbarState({
          success: resp.data.success,
          message: resp.data.message,
        });
      } else {
        setShowSnackbar(false);
        setSnackbarState({
          success: false,
          message: resp.data.message,
        });
      }
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

  const handleEditorChange = (content) => {
    setProduct((prevValue) => ({
      ...prevValue,
      description: content,
    }));
  };

  const handleOnPublish = async () => {
    try {
      const resp = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URI}/product/add-product`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          name: null,
          title: product.title,
          description: product.description,
          category: product.category,
          vendor: product.vendor,
          stock: product.stock,
          vendorPrice: product.vendorPrice,
          price: product.sellPrice,
          storeId: 1,
          status: "publish",
        },
      });
      if (resp.data.success) {
        setShowSnackbar(true);
        setSnackbarState({
          success: resp.data.success,
          message: resp.data.message,
        });
        setProduct({
          title: "",
          description: "",
          category: "",
          vendor: "",
          tags: "",
          vendorPrice: "",
          sellPrice: "",
          stock: 0,
        });
      } else {
        setShowSnackbar(false);
        setSnackbarState({
          success: false,
          message: resp.data.message,
        });
        setProduct({
          title: "",
          description: "",
          category: "",
          vendor: "",
          tags: "",
          vendorPrice: "",
          sellPrice: "",
          stock: 0,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };

  const handleSaveDraft = async () => {
    try {
      const resp = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URI}/product/add-product`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          name: null,
          title: product.title,
          description: product.description,
          category: product.category,
          vendor: product.vendor,
          stock: product.stock,
          vendorPrice: product.vendorPrice,
          price: product.sellPrice,
          storeId: 1,
          status: "draft",
        },
      });
      if (resp.data.success) {
        setShowSnackbar(true);
        setSnackbarState({
          success: resp.data.success,
          message: resp.data.message,
        });
        setProduct({
          title: "",
          description: "",
          category: "",
          vendor: "",
          tags: "",
          vendorPrice: "",
          sellPrice: "",
          stock: 0,
        });
      } else {
        setShowSnackbar(false);
        setSnackbarState({
          success: false,
          message: resp.data.message,
        });
        setProduct({
          title: "",
          description: "",
          category: "",
          vendor: "",
          tags: "",
          vendorPrice: "",
          sellPrice: "",
          stock: 0,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error);
        return;
      } else if (error.request) {
        console.error(
          `Error occured while fetching categories --> No response received from server`
        );
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error occurred while login --> ${error.message}`);
        return;
      }
    }
  };

  return (
    <div className="add-product py-[3rem] px-[1.8rem] bg-[#f6f7fb]">
      <div className="flex justify-between mb-[2rem]">
        <div>
          <h1 className="mb-[1rem] font-[800] text-[1.95rem] text-[#141824] leading-4">
            Add a product
          </h1>
          <p className="text-[#525b75] font-[400] text-[1rem] mb-[0.25rem] leading-4">
            Orders placed across your store
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setProduct({
                title: "",
                description: "",
                category: "",
                vendor: "",
                tags: "",
                vendorPrice: "",
                sellPrice: "",
                stock: 0,
              });
            }}
            className="cursor-pointer bg-[#f5f7fa] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[500] leading-5 mr-[0.5rem] border-[1px] border-[#e3e6ed] rounded-[0.375rem] hover:bg-[#e3e6ed] hover:text-[#222834]"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="cursor-pointer px-[1.5rem] py-[0.625rem] mr-[0.5rem] text-[0.8rem] font-[500] text-[#3874ff] bg-[#f5f7fa] border-[#e3e6ed] hover:border-[#e6e9ef] hover:bg-[#e3e6ed] hover:text-[#004dff] rounded-[0.375rem] border-[1px] leading-5"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={handleOnPublish}
            className="cursor-pointer px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[600] text-[#fff] bg-[#3874ff] border-[transparent] hover:text-[#fff] hover:bg-[#004dff] leading-5 rounded-[0.375rem] border-[1px]"
          >
            Publish product
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-[75%] mr-[1rem]">
          <div>
            <h1 className="mb-[1rem] text-[1.25rem] leading-4 font-[500] text-[#141824]">
              Product Title
            </h1>
            <input
              type="text"
              value={product.title}
              placeholder="Write title here...."
              className="mb-[2rem] py-[0.5rem] px-[1rem] leading-5 text-[0.8rem] font-[400] bg-[#fff] bg-clip-padding w-[100%] border-[1px] border-[#cbd0dd] rounded-[0.375rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0)] transition-all duration-[0.15s] ease-in-out focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
              onChange={(e) => {
                setProduct((prevValue) => ({
                  ...prevValue,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-[2rem]">
            <h1 className="mb-[1rem] text-[1.25rem] leading-4 font-[500] text-[#141824]">
              Product Description
            </h1>
            <RichTextEditor
              handleEditorChange={handleEditorChange}
              product={product}
              className="h-[15rem] w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] whitespace-pre-wrap border-[1px] border-[#cbd0dd] rounded-[0.375rem] focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
            />
            {/* <textarea
              placeholder="Write a description here...."
              className="h-[15rem] w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] whitespace-pre-wrap border-[1px] border-[#cbd0dd] rounded-[0.375rem] focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
            ></textarea> */}
          </div>
          <div>
            <h1 className="mb-[1rem] text-[1.25rem] font-[500] text-[#141824] leading-4">
              Inventory
            </h1>
            <div className="tabs border-y-[1px] border-[#cbd0dd] flex">
              <div className="border-r-[1px] border-[#cbd0dd] w-[30%]">
                <ul className="tabs-options">
                  <li
                    className={`cursor-pointer border-b-[1px] text-[0.8rem] border-[#cbd0dd] py-[14px] px-[8px] flex ${activeTab === "pricing" ? "active" : "text-[#3e465b]"}`}
                    onClick={() => setActiveTab("pricing")}
                  >
                    <FeatherIcon
                      icon="tag"
                      size="12"
                      className="mt-[0.2rem] mr-[0.5rem]"
                    />
                    <span className="tab-option-menu">Pricing</span>
                  </li>
                  <li
                    className={`cursor-pointer border-b-[1px] text-[0.8rem] border-[#cbd0dd] py-[14px] px-[8px] flex ${activeTab === "restock" ? "active" : "text-[#3e465b]"}`}
                    onClick={() => setActiveTab("restock")}
                  >
                    <FeatherIcon
                      icon="package"
                      size="12"
                      className="mt-[0.2rem] mr-[0.5rem]"
                    />
                    <span className="tab-option-menu">Restock</span>
                  </li>
                  <li
                    className={`cursor-pointer py-[14px] text-[0.8rem] px-[8px] flex ${activeTab === "advanced" ? "active" : "text-[#3e465b]"}`}
                    onClick={() => setActiveTab("advanced")}
                  >
                    <FeatherIcon
                      icon="lock"
                      size="12"
                      className="mt-[0.2rem] mr-[0.5rem]"
                    />
                    <span className="tab-option-menu">Advanced</span>
                  </li>
                </ul>
              </div>
              <div className="tab-content w-[70%]">
                {activeTab === "pricing" && (
                  <div className="flex mt-[16px] px-[3rem]">
                    <div className="regular-price px-[8px] w-[50%]">
                      <h1 className="mb-[0.5rem] text-[1rem] leading-4 font-[500]">
                        Regular price
                      </h1>
                      <input
                        type="text"
                        placeholder="$$$"
                        value={product.vendorPrice}
                        onChange={(e) => {
                          setProduct((prevValue) => ({
                            ...prevValue,
                            vendorPrice: e.target.value,
                          }));
                        }}
                        className="w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] leading-5 text-[#31374a] bg-[#fff] border-[1px] border-[#cbd0dd] rounded-[0.375rem]"
                      />
                    </div>
                    <div className="sale-price px-[8px] w-[50%]">
                      <h1 className="mb-[0.5rem] text-[1rem] leading-4 font-[500]">
                        Sale price
                      </h1>
                      <input
                        type="text"
                        placeholder="$$$"
                        value={product.sellPrice}
                        onChange={(e) => {
                          setProduct((prevValue) => ({
                            ...prevValue,
                            sellPrice: e.target.value,
                          }));
                        }}
                        className="w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] leading-5 text-[#31374a] bg-[#fff] border-[1px] border-[#cbd0dd] rounded-[0.375rem]"
                      />
                    </div>
                  </div>
                )}
                {activeTab === "restock" && (
                  <div className="restock-component mt-[16px] px-[3rem]">
                    <div className="new-stock">
                      <h1 className="mb-[0.5rem] text-[1rem] leading-4 font-[500]">
                        Add to Stock
                      </h1>
                      <div className="flex">
                        <input
                          type="text"
                          value={product.stock}
                          placeholder="Quantity"
                          onChange={(e) => {
                            setProduct((prevValue) => ({
                              ...prevValue,
                              stock: e.target.value,
                            }));
                          }}
                          className="py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] leading-5 text-[#31374a] bg-[#fff] border-[1px] border-[#cbd0dd] rounded-[0.375rem]"
                        />
                        <button
                          className="flex text-[#fff] bg-[#3874ff] border-[transparent] hover:bg-[#004dff] text-[0.8rem] px-[1.5rem] py-[0.625rem] leading-5 font-[500] rounded-[0.375rem] ml-[1rem]"
                          type="button"
                        >
                          {" "}
                          <FeatherIcon
                            icon="check"
                            size="16"
                            className="mt-[0.2rem] mr-[0.5rem]"
                          />
                          Confirm
                        </button>
                      </div>
                    </div>
                    <div className="stock-info"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25%] border-[1px] border-[#cbd0dd8a] h-fit bg-[#fff] rounded-[0.375rem]">
          <div className="p-[24px]">
            <h1 className="mb-[1.5rem] text-[#141824] text-[1.25rem] font-[500] leading-4">
              Organize
            </h1>
            <div className="px-[8px] pb-[1.5rem]">
              <div className="flex flex-wrap mb-[0.5rem]">
                <h2
                  className="mr-[0.5rem] cursor-pointer text-[#222834] text-[1rem] leading-4 font-[500]"
                  onClick={() => setActiveOrganizeCategoryTab("category")}
                >
                  Category
                </h2>
                <h2
                  className="text-[0.8rem] text-[#3874ff] cursor-pointer leading-5 hover:underline"
                  onClick={() => setActiveOrganizeCategoryTab("addNewCategory")}
                >
                  Add new category
                </h2>
              </div>
              {activeOrganizeCategoryTab === "category" && (
                <div className="select-category-option mb-[1rem]">
                  <select
                    onChange={(e) => {
                      setProduct((prevValue) => ({
                        ...prevValue,
                        category: e.target.value,
                      }));
                    }}
                    className="w-[100%] py-[8px] pl-[16px] pr-[40px] text-[0.8rem] leading-5 font-[400] border-[1px] border-[#cbd0dd] rounded-[0.375rem] bg-[#fff]"
                  >
                    <option>--Please chosse an option--</option>
                    {categories.map((category) => (
                      <option
                        value={category.name.toLowerCase()}
                        key={category.id}
                      >
                        {category.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {activeOrganizeCategoryTab === "addNewCategory" && (
                <div className="flex mb-[1rem]">
                  <input
                    type="text"
                    placeholder="add new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="py-[0.2rem] px-[0.5rem] leading-5 text-[0.8rem] font-[400] bg-[#fff] bg-clip-padding w-[100%] border-[1px] border-[#cbd0dd] rounded-[0.375rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0)] transition-all duration-[0.15s] ease-in-out focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
                  />
                  <button
                    onClick={handleAddNewCategory}
                    className="ml-[0.5rem] cursor-pointer px-[1rem] py-[0.2rem] text-[0.8rem] text-[#fff] bg-[#3874ff] border-[transparent] hover:text-[#fff] hover:bg-[#004dff] leading-5 rounded-[0.375rem] border-[1px]"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="px-[8px] pb-[1.5rem]">
              <div className="flex flex-wrap mb-[0.5rem]">
                <h2
                  className="mr-[0.5rem] cursor-pointer text-[#222834] text-[1rem] leading-4 font-[500]"
                  onClick={() => setActiveOrganizeVendorTab("vendor")}
                >
                  Vendor
                </h2>
                <h2
                  className="text-[0.8rem] text-[#3874ff] cursor-pointer leading-5 hover:underline"
                  onClick={() => setActiveOrganizeVendorTab("addNewVendor")}
                >
                  Add new vendor
                </h2>
              </div>
              {activeOrganizeVendorTab === "vendor" && (
                <div className="select-vendor-option mb-[1rem]">
                  <select
                    onChange={(e) => {
                      setProduct((prevValue) => ({
                        ...prevValue,
                        vendor: e.target.value,
                      }));
                    }}
                    className="w-[100%] py-[8px] pl-[16px] pr-[40px] text-[0.8rem] leading-5 font-[400] border-[1px] border-[#cbd0dd] rounded-[0.375rem] bg-[#fff]"
                  >
                    <option>--Please chosse an option--</option>
                    {vendors.map((vendor) => (
                      <option value={vendor.name.toLowerCase()} key={vendor.id}>
                        {vendor.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {activeOrganizeVendorTab === "addNewVendor" && (
                <div className="flex mb-[1rem]">
                  <input
                    type="text"
                    placeholder="add new vendor"
                    value={newVendor}
                    onChange={(e) => {
                      setNewVendor(e.target.value);
                    }}
                    className="py-[0.2rem] px-[0.5rem] leading-5 text-[0.8rem] font-[400] bg-[#fff] bg-clip-padding w-[100%] border-[1px] border-[#cbd0dd] rounded-[0.375rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0)] transition-all duration-[0.15s] ease-in-out focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
                  />
                  <button
                    onClick={handleAddNewVendors}
                    className="ml-[0.5rem] cursor-pointer px-[1rem] py-[0.2rem] text-[0.8rem] text-[#fff] bg-[#3874ff] border-[transparent] hover:text-[#fff] hover:bg-[#004dff] leading-5 rounded-[0.375rem] border-[1px]"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="px-[8px] pb-[1.5rem]">
              <div className="flex flex-wrap mb-[0.5rem]">
                <h2 className="mr-[0.5rem] text-[#222834] text-[1rem] leading-4 font-[500]">
                  Tags
                </h2>
                <h2 className="text-[0.8rem] text-[#3874ff] cursor-pointer leading-5">
                  View all tags
                </h2>
              </div>
              <div className="select-tags-option mb-[1rem]">
                <select className="w-[100%] py-[8px] pl-[16px] pr-[40px] text-[0.8rem] leading-5 font-[400] border-[1px] border-[#cbd0dd] rounded-[0.375rem] bg-[#fff]">
                  <option>--Please chosse an option--</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSnackbar ? (
        <CustomSnackbar
          message={snackbarState.message}
          sucess={snackbarState.success}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddProduct;
