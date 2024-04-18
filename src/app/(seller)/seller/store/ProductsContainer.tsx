"use client";
import { productType } from "@/app/interfaces/productInterface";
import React, { useOptimistic } from "react";
import SellerProductCard from "./SellerProductCard";

const ProductsContainer = ({ products }: { products: productType[] }) => {
  const [OptimisticProducts, deleteOptimisticProduct] = useOptimistic<
    productType[],
    string
  >(products, (state, id) => {
    const filtered = state.filter((p: productType) => p.id !== id);
    return [...filtered];
  });

  return (
    <div>
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
