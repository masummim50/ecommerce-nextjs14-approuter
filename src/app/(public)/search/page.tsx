import { baseUrl } from '@/shared/urls';
import React from 'react';
import Pages from '../product/category/[category]/Pagination';
import ProductContainer from '../product/category/[category]/ProductContainer';
import { getToAndFrom } from '@/helpers/toAndFrom';

const SearchPage = async({searchParams}:{searchParams: {query:string}}) => {
    const result = await fetch(`${baseUrl}/product/search?query=${searchParams.query}`);
    const data = await result.json();

    const {from,to,total} = getToAndFrom(data.meta);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-[90vh] pt-3 p-2">
      <div className="max-w-[1100px]  m-auto text-black dark:text-gray-300">
        {data.data?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Search Results for: {searchParams.query}</h2>
            <p>
              showing {from} to{" "}
              {to} of {total}
            </p>
          </div>
        )}
        {data.data.length > 0 && <ProductContainer products={data.data} />}
        {data.meta.totalPage > 1 && (
          <div className="flex justify-center">
            <Pages meta={data.meta} />
          </div>
        )}
      </div>
    </div>
    );
};

export default SearchPage;