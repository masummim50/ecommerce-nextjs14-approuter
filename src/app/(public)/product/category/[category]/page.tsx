import React from "react";
import Pages from "./Pagination";
import { baseUrl } from "@/shared/urls";
import ProductContainer from "./ProductContainer";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: string };
}) => {
  console.log("params: ", searchParams);
  const currentPage = Number(searchParams?.page) || 1;
  const data = await fetch(
    `${baseUrl}/product/category/${params.category}?page=${currentPage}`, {cache: 'no-store'}
  );
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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[60vh] pt-3 p-2">
      <div className="max-w-[1100px]  m-auto text-black dark:text-gray-300">
        {result.data?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">{params.category}</h2>
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
    </div>
  );
};

export default CategoryPage;
