"use client";
import { productType } from "@/app/interfaces/productInterface";
import React, { useOptimistic } from "react";
import SellerProductCard from "./SellerProductCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ProductsContainer = ({ products }: { products: productType[] }) => {
  const [OptimisticProducts, deleteOptimisticProduct] = useOptimistic<
    productType[],
    string
  >(products, (state, id) => {
    const filtered = state.filter((p: productType) => p.id !== id);
    return [...filtered];
  });
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent}>
      {OptimisticProducts.map((product: productType) => {
        return (
          <SellerProductCard
            deleteOptimisticProduct={deleteOptimisticProduct}
            key={product.id}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default ProductsContainer;
