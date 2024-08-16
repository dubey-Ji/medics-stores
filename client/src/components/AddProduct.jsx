import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import FeatherIcon from "feather-icons-react";
import axios from "axios";

const AddProduct = function () {
  const [activeTab, setActiveTab] = useState("pricing");
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [tags, setTags] = useState([]);

  // Fetch categories, vendors, tags
  const fetchCategories = async () => {
    try {
      const resp = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URI}/vendors`,
        withCredentials: true,
      });
      console.log("resp of categories", resp);
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
  const fetchVendors = async () => {};
  const fetchTags = async () => {};
  useEffect(() => {
    fetchCategories();
  }, []);

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
            className="cursor-pointer bg-[#f5f7fa] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[500] leading-5 mr-[0.5rem] border-[1px] border-[#e3e6ed] rounded-[0.375rem] hover:bg-[#e3e6ed] hover:text-[#222834]"
          >
            Discard
          </button>
          <button
            type="button"
            className="cursor-pointer px-[1.5rem] py-[0.625rem] mr-[0.5rem] text-[0.8rem] font-[500] text-[#3874ff] bg-[#f5f7fa] border-[#e3e6ed] hover:border-[#e6e9ef] hover:bg-[#e3e6ed] hover:text-[#004dff] rounded-[0.375rem] border-[1px] leading-5"
          >
            Save draft
          </button>
          <button
            type="button"
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
              placeholder="Write title here...."
              className="mb-[2rem] py-[0.5rem] px-[1rem] leading-5 text-[0.8rem] font-[400] bg-[#fff] bg-clip-padding w-[100%] border-[1px] border-[#cbd0dd] rounded-[0.375rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0)] transition-all duration-[0.15s] ease-in-out focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]"
            />
          </div>
          <div className="mb-[2rem]">
            <h1 className="mb-[1rem] text-[1.25rem] leading-4 font-[500] text-[#141824]">
              Product Description
            </h1>
            <RichTextEditor className="h-[15rem] w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] whitespace-pre-wrap border-[1px] border-[#cbd0dd] rounded-[0.375rem] focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]" />
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
                          placeholder="Quantity"
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
                <h2 className="mr-[0.5rem] text-[#222834] text-[1rem] leading-4 font-[500]">
                  Category
                </h2>
                <h2 className="text-[0.8rem] text-[#3874ff] cursor-pointer leading-5">
                  Add new category
                </h2>
              </div>
              <div className="select-category-option mb-[1rem]">
                <select className="w-[100%] py-[8px] pl-[16px] pr-[40px] text-[0.8rem] leading-5 font-[400] border-[1px] border-[#cbd0dd] rounded-[0.375rem] bg-[#fff]">
                  <option>--Please chosse an option--</option>
                  <option value="medicine">Medicine</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
            </div>
            <div className="px-[8px] pb-[1.5rem]">
              <div className="flex flex-wrap mb-[0.5rem]">
                <h2 className="mr-[0.5rem] text-[#222834] text-[1rem] leading-4 font-[500]">
                  Vendor
                </h2>
                <h2 className="text-[0.8rem] text-[#3874ff] cursor-pointer leading-5">
                  Add new vendor
                </h2>
              </div>
              <div className="select-vendor-option mb-[1rem]">
                <select className="w-[100%] py-[8px] pl-[16px] pr-[40px] text-[0.8rem] leading-5 font-[400] border-[1px] border-[#cbd0dd] rounded-[0.375rem] bg-[#fff]">
                  <option>--Please chosse an option--</option>
                  <option value="medicine">Medicine</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
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
                  <option value="medicine">Medicine</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
