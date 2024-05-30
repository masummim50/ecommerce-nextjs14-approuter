import { productType } from "@/app/interfaces/productInterface";
import { baseUrl } from "@/shared/urls";
import React from "react";
import SellerProductCard from "./SellerProductCard";
import ProductsContainer from "./ProductsContainer";
import { Pagination } from "@nextui-org/react";
import Pages from "@/app/(public)/product/category/[category]/Pagination";

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
      <ProductsContainer products={data.data} />
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
