import { productType } from "@/app/interfaces/productInterface";
import { baseUrl } from "@/shared/urls";
import React from "react";
import SellerProductCard from "./SellerProductCard";
import ProductsContainer from "./ProductsContainer";
import { Pagination } from "@nextui-org/react";
import Pages from "@/app/(public)/product/category/[category]/Pagination";
import SearchLoadingStateUpdate from "@/app/(public)/search/SearchLoadingStateUpdate";

const Products = async ({
  storeId,
  searchParams,
}: {
  storeId: string;
  searchParams: any;
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query || "";
  console.log("seller store search params: ", searchParams);
  const result = await fetch(
    `${baseUrl}/product/store/${storeId}?query=${searchText}&page=${currentPage}`,
    {
      method: "GET",

      credentials: "include",
      next: { tags: ["sellerProducts"] },
    }
  );
  const data = await result.json();
  return (
    <div>
      <SearchLoadingStateUpdate data={data?.data} date={new Date().getTime()} type="seller"/>
      <ProductsContainer products={data.data} />
      {
          data.data?.length < 1 && searchText !== "" && (
            <div className="flex justify-center items-center rounded-md h-[200px] bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-400">
              <p>0 Results found for: <span className="font-semibold">{searchParams.query}</span></p>
            </div>
          )
        }
      {
        data?.meta?.totalPage > 1 &&
      <div className=" mt-3 flex justify-center">
        <Pages meta={data.meta} />
      </div>
      }
    </div>
  );
};

export default Products;
