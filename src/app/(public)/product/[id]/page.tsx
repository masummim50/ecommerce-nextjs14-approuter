import { calculateRating } from "@/app/components/product/PublicProductCard";
import { productType } from "@/app/interfaces/productInterface";
import { baseUrl } from "@/shared/urls";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import ProductDetails from "./ProductDetails";
import { Suspense } from "react";
import RelatedProducts from "./RelatedProducts";
import PublicProductCardSkeleton from "@/app/components/skeletons/PublicProductCardSkeleton";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(`${baseUrl}/product/${params.id}`, {cache: 'no-store'});
  const result = await data.json();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-3 p-2">
      
      <div className="max-w-[1100px]  m-auto text-black dark:text-gray-300">
        {result.data?.id && <ProductDetails product={result.data} />}
        {!result.data?.id && "no produt found"}
        {result.data?.id && (
          <Suspense fallback={<p>Related products loading...</p>}>
            <RelatedProducts
              category={result?.data?.category}
              currentProductId={result?.data?.id}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
