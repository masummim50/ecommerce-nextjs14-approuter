import { baseUrl } from "@/shared/urls";
import React from "react";
import Pages from "../product/category/[category]/Pagination";
import ProductContainer from "../product/category/[category]/ProductContainer";
import { getToAndFrom } from "@/helpers/toAndFrom";
import SearchLoadingStateUpdate from "./SearchLoadingStateUpdate";

import type { Metadata, ResolvingMetadata } from "next";
import ScrollToTop from "@/app/ScrollToTop";

type Props = {
  searchParams: { query: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: searchParams.query,
  };
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) => {
  const result = await fetch(
    `${baseUrl}/product/search?query=${searchParams.query}&page=${
      searchParams.page || "1"
    }`,
    { cache: "no-store" }
  );
  const data = await result.json();

  const { from, to, total } = getToAndFrom(data.meta);
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[500px] pt-3 p-2">
      <ScrollToTop/>
      <div className="max-w-[1100px]  m-auto text-black dark:text-gray-300">
        {data.data?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">
              Search Results for: {searchParams.query}
            </h2>
            <p>
              showing {from} to {to} of {total}
            </p>
          </div>
        )}

        <SearchLoadingStateUpdate data={data} date={new Date().getTime()} />

        {data.data.length > 0 && <ProductContainer products={data.data} />}
        {data.meta.totalPage > 1 && (
          <div className="flex justify-center">
            <Pages meta={data.meta} />
          </div>
        )}
        {data.data?.length < 1 && (
          <div className="flex justify-center items-center rounded-md h-[200px] bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-400">
            <p>
              0 Results found for:{" "}
              <span className="font-semibold">{searchParams.query}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
