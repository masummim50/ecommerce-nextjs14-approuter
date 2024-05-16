import { calculateRating } from "@/app/components/product/PublicProductCard";
import { productType } from "@/app/interfaces/productInterface";
import { baseUrl } from "@/shared/urls";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import ProductDetails from "./ProductDetails";
import { Suspense } from "react";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {

  const data = await fetch(`${baseUrl}/product/${params.id}`);
  const result = await data.json();
  return (
    <div className="max-w-[1100px] m-auto">
      <ProductDetails product={result.data} />
      <Suspense fallback={<p>Related products loading...</p>}>
        <RelatedProducts category={result?.data?.category} currentProductId={result?.data?.id}/>
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
