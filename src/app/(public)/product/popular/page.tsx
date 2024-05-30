import { baseUrl } from "@/shared/urls";
import React from "react";
import ProductContainer from "../category/[category]/ProductContainer";
import Pages from "../category/[category]/Pagination";

const PopularPage = async () => {
  // fetch popular data
  const data = await fetch(`${baseUrl}/product/popular`);
  const result = await data.json();
  console.log("popular page data: ", result)
  const metaInfo: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  } = result.meta;

  const to =
    metaInfo.total - metaInfo.page * metaInfo.size >= 0
      ? metaInfo.page * metaInfo.size
      : metaInfo.total;
  // add pagination

  return <div className="bg-gray-100 dark:bg-gray-900 h-[90vh] pt-3 p-2">
  <div className="max-w-[1100px]  m-auto text-black dark:text-gray-300">
    {result.data?.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold">Popular Items</h2>
        <p>
          showing {metaInfo.page * metaInfo.size - (metaInfo.size - 1)} to{" "}
          {to} of {metaInfo.total}
        </p>
      </div>
    )}
    {result.data.length > 0 && <ProductContainer products={result.data} />}
    {result.meta.totalPage > 1 && (
      <div className="flex justify-center">
        <Pages meta={result.meta} />
      </div>
    )}
  </div>
</div>;
};

export default PopularPage;
