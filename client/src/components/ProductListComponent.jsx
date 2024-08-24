import moment from "moment/moment";

const ProductListComponent = function ({ product }) {
  const { title, description, price, categoryName, vendorName, createdAt } =
    product;
  return (
    <tr>
      <td className="w-[18px] py-[10px] pr-[8px] border-b-[1px] leading-4"></td>
      <td className="uppercase text-center font-[400] text-[0.8rem] w-[350px] pt-[0.625rem] pb-[0.625rem] pl-[24px] pr-[8px] leading-4 border-b-[1px]">
        {title}
      </td>
      <td className="uppercase text-center font-[400] text-[0.8rem] w-[150px] border-b-[1px] py-[10px] pl-[24px] pr-[8px] leading-4">
        {price}
      </td>
      <td className="uppercase text-center font-[400] text-[0.8rem] w-[150px] border-b-[1px] py-[10px] pl-[24px] pr-[8px] leading-4">
        {categoryName}
      </td>
      <td className="uppercase text-center font-[400] text-[0.8rem] w-[200px] py-[10px] pl-[24px] pr-[8px] leading-4 border-b-[1px]">
        {vendorName}
      </td>
      <td className="text-center font-[400] text-[0.8rem] w-[150px] border-b-[1px] leading-4 py-[10px] pl-[24px] pr-[8px]">
        {moment(createdAt).format("LLL")}
      </td>
      <td className="py-[10px] pl-[5rem] pr-[4rem] border-b-[1px] leading-4 w-[18px]"></td>
    </tr>
  );
};

export default ProductListComponent;
