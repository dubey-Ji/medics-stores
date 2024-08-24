import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductListComponent from "./ProductListComponent";

const Product = function () {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [draftsProducts, setDraftsProducts] = useState([]);
  const [productsCount, setProductsCount] = useState({
    all: 0,
    published: 0,
    draft: 0,
  });

  const fetchProducts = async () => {
    try {
      const resp = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URI}/product/fetch-product?storeId=1`,
        withCredentials: true,
      });
      if (resp.data.success) {
        setAllProducts(resp.data.data.allProducts);
        setPublishedProducts(resp.data.data.publishedProducts);
        setDraftsProducts(resp.data.data.draftProducts);
        setProductsCount({
          all: resp.data.data.allProductsCount,
          published: resp.data.data.publishProductCount,
          draft: resp.data.data.draftProductCount,
        });
        if (activeTab === "all") {
          setProducts(resp.data.data.allProducts);
        } else if (activeTab === "published") {
          setProducts(resp.data.data.publishedProducts);
        } else if (activeTab === "drafts") {
          setProducts(resp.data.data.draftProducts);
        }
      }
      console.log("resp of products", resp);
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
    fetchProducts();
  }, []);

  const handleOnSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setSearch(e.target.value);
    if (activeTab === "all") {
      let searchValues = allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue);
      });
      setProducts(searchValues);
    } else if (activeTab === "published") {
      let searchValues = publishedProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue);
      });
      setProducts(searchValues);
    } else if (activeTab === "drafts") {
      let searchValues = draftsProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue);
      });
      setProducts(searchValues);
    }
  };
  return (
    <div className="py-[3rem] px-[1.8rem] bg-[#f6f7fb]">
      <div>
        <div className="page-header">
          <h1 className="mb-[1.5rem] font-[700] text-[1.95rem] text-[#141824] leading-5">
            Products
          </h1>
        </div>
        <div className="options-headers mb-[0.5rem]">
          <ul className="flex">
            <li
              className={`hover:underline text-[0.8rem] cursor-pointer font-[700] px-[16px] py-[8px] ${activeTab === "all" ? "productactive" : "text-[#3874ff]"}`}
              onClick={() => {
                setActiveTab("all");
                setProducts(allProducts);
              }}
            >
              All
              <span className=""> ({productsCount.all})</span>
            </li>
            <li
              className={`hover:underline text-[0.8rem] cursor-pointer font-[700] px-[16px] py-[8px] ${activeTab === "published" ? "productactive" : "text-[#3874ff]"}`}
              onClick={() => {
                setActiveTab("published");
                setProducts(publishedProducts);
              }}
            >
              Published <span> ({productsCount.published})</span>
            </li>
            <li
              className={`hover:underline text-[0.8rem] cursor-pointer font-[700] px-[16px] py-[8px] ${activeTab === "drafts" ? "productactive" : "text-[#3874ff]"}`}
              onClick={() => {
                setActiveTab("drafts");
                setProducts(draftsProducts);
              }}
            >
              Drafts <span> ({productsCount.draft})</span>
            </li>
          </ul>
        </div>
        <div className="mb-[1.5rem] flex flex-wrap justify-between">
          <div className="search-bar text-[0.8rem] w-[20rem] text-[#31374a] leading-5 font-[300]">
            <input
              className="py-[8px] pl-[40px] pr-[32px] border-[1px] rounded-[0.365rem] w-[100%] text-[0.8rem] bg-[#fff]"
              type="text"
              placeholder="Search products"
              value={search}
              onChange={handleOnSearch}
            />
            <FeatherIcon
              icon="search"
              size="12"
              className="relative top-[-25] left-[15] text-[#31374a]"
            />
          </div>
          <div className="flex">
            <div>
              <button
                className="flex font-[600] hover:underline py-[10px] mr-[24px] text-[#31374a]"
                type="button"
              >
                {" "}
                <FeatherIcon
                  icon="file-text"
                  size="14"
                  className="mt-[0.3rem] mr-[0.5rem] text-[#000]"
                />
                Export
              </button>
            </div>
            <div className="">
              {/* TODO BUG: When clicking on the below link, the menu Add Product is not getting selected in sidebar */}
              <Link
                type="button"
                to="/add-product"
                className="flex text-[#fff] bg-[#3874ff] hover:bg-[#004dff] border-[1px] py-[10px] px-[24px] border-[transparent] rounded-[0.375rem]"
              >
                {" "}
                <FeatherIcon
                  icon="plus"
                  size="14"
                  className="mt-[0.3rem] mr-[0.5rem]"
                />{" "}
                Add product
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#fff]">
          <table>
            <thead>
              <tr>
                <th className="w-[18px] py-[10px] pr-[8px] border-b-[1px] leading-4"></th>
                <th className="uppercase font-[700] text-[0.8rem] w-[350px] pt-[0.625rem] pb-[0.625rem] pl-[24px] pr-[8px] leading-4 border-b-[1px]">
                  Product Name
                </th>
                <th className="uppercase font-[700] text-[0.8rem] w-[150px] border-b-[1px] py-[10px] pl-[24px] pr-[8px] leading-4">
                  Price
                </th>
                <th className="uppercase font-[700] text-[0.8rem] w-[150px] border-b-[1px] py-[10px] pl-[24px] pr-[8px] leading-4">
                  Category
                </th>
                <th className="uppercase font-[700] text-[0.8rem] w-[200px] py-[10px] pl-[24px] pr-[8px] leading-4 border-b-[1px]">
                  Vendor
                </th>
                <th className="uppercase font-[700] text-[0.8rem] w-[150px] border-b-[1px] leading-4 py-[10px] pl-[24px] pr-[8px]">
                  Published On
                </th>
                <th className="py-[10px] pl-[5rem] pr-[4rem] border-b-[1px] leading-4 w-[18px]"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductListComponent key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
