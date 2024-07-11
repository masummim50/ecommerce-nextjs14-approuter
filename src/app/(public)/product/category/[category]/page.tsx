import React from "react";
import Pages from "./Pagination";
import { baseUrl } from "@/shared/urls";
import ProductContainer from "./ProductContainer";
import SearchLoadingStateUpdate from "@/app/(public)/search/SearchLoadingStateUpdate";
import { Metadata, ResolvingMetadata } from "next";
import ZeroFound from "@/components/shared/ZeroFound";
import ScrollToTop from "@/app/ScrollToTop";


export async function generateMetadata(
  { params }: {params:{category:string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title:params.category,
  }
}



const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await fetch(
    `${baseUrl}/product/category/${params.category}?page=${currentPage}`,
    { cache: "no-store" }
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[300px] pt-3 p-2">
      <ScrollToTop/>
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
        {result.data.length > 0 ? <ProductContainer products={result.data} /> : <ZeroFound text={`No product found in ${params.category} category`}/> }
        <SearchLoadingStateUpdate data={result.data} date={new Date().getTime()} />
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
