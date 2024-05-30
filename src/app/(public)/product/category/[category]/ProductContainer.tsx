import PublicProductCard from "@/app/components/product/PublicProductCard";
import { productType } from "@/app/interfaces/productInterface";
import Link from "next/link";
import React from "react";

const ProductContainer = ({ products }: { products: productType[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {products.map((product) => {
        return (
          <Link href={`/product/${product.id}`} key={product.id}>
            <PublicProductCard product={product} />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductContainer;
