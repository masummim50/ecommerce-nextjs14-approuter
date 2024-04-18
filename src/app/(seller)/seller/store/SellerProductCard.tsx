"use client";
import React, { startTransition } from "react";
import { productType } from "@/app/interfaces/productInterface";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { deleteProductAction } from "@/actions/sellerActions";

const SellerProductCard = ({
  product,
  deleteOptimisticProduct,
}: {
  product: productType;
  deleteOptimisticProduct: any;
}) => {
  console.log("card data: ", product);
  return (
    <div className="flex justify-between items-center mb-2 shadow-md rounded-md">
      <div className="flex w-[50%] items-center gap-2">
        <Image
          src={product.images[0]}
          alt="product image"
          height={100}
          width={100}
          style={{width:'auto', height:'auto'}}
        />
        <div>

        <p>{product.name}</p>
        <p>{product.description}</p>
        </div>
      </div>
      <div className="flex w-[50%] justify-end">
        <Button size="sm">Edit</Button>
        <Button
          onClick={async () => {
            startTransition(() => {
              deleteOptimisticProduct(product.id);
            });
            await deleteProductAction(product.id);
          }}
          size="sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SellerProductCard;
