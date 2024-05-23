import React from "react";
import { productType } from "@/app/interfaces/productInterface";
import PublicProductCard from "@/app/components/product/PublicProductCard";
import Link from "next/link";

const RelatedProductsContents = ({ products }: { products: productType[] }) => {
  return (
    <div>
        {/* {JSON.stringify(products)} */}
      {products?.length > 0 ? (
        <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {
                products?.map((product)=> {
                    return (
                        <Link href={`/product/${product.id}`} key={product.id} className=" shadow hover:shadow-lg">
                        <PublicProductCard key={product?.id} product={product}/>
                        </Link>
                    )
                })
            }
        </div>
      ) : (
        <div className="h-[40px] bg-white dark:bg-gray-800 text-black dark:text-gray-300 flex items-center justify-center">
          No other products found in this category
        </div>
      )}
    </div>
  );
};

export default RelatedProductsContents;
