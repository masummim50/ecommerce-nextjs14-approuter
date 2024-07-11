import { baseUrl } from "@/shared/urls";
import React from "react";
import ProductContainer from "../category/[category]/ProductContainer";
import Pages from "../category/[category]/Pagination";
import SearchLoadingStateUpdate from "../../search/SearchLoadingStateUpdate";

import { Metadata } from "next";
import ScrollToTop from "@/app/ScrollToTop";


export const metadata: Metadata = {
  title: 'Popular Items',
  description: '',
}

const PopularPage = async ({searchParams}:{searchParams:{page:string}}) => {
  // fetch popular data
  const data = await fetch(`${baseUrl}/product/popular?page=${searchParams.page}`, {cache: 'no-store'});
  const result = await data.json();
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

  return <div className="bg-gray-100 dark:bg-gray-900 min-h-[300px] pt-3 p-2">
    <ScrollToTop/>
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
    
    <SearchLoadingStateUpdate data={result.data} date={new Date().getTime()} />
    {result.meta.totalPage > 1 && (
      <div className="flex justify-center">
        <Pages meta={result.meta} />
      </div>
    )}
  </div>
</div>;
};

export default PopularPage;
