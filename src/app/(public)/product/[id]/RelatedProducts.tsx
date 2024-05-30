import { baseUrl } from "@/shared/urls";
import React from "react";
import RelatedProductsContents from "./RelatedProductsContents";
import { productType } from "@/app/interfaces/productInterface";

const RelatedProducts = async ({
  category,
  currentProductId,
}: {
  category: string;
  currentProductId: string;
}) => {
  // do the fetch request here
  const data = await fetch(`${baseUrl}/product/category/${category}`);
  const result = await data.json();
  return (
    <div className="mt-4 ">
      <h2 className="text-center">Other Products you might like</h2>
      {/* related products will go here {result.data?.length} */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-sm">
        <RelatedProductsContents
          products={result?.data?.filter(
            (product: productType) => product.id !== currentProductId
          )}
        />
      </div>
    </div>
  );
};

export default RelatedProducts;
