"use client";
import React, { startTransition } from "react";
import { productType } from "@/app/interfaces/productInterface";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { deleteProductAction } from "@/actions/sellerActions";
import Link from "next/link";

import { useRouter } from "next/navigation";

const SellerProductCard = ({
  product,
  deleteOptimisticProduct,
}: {
  product: productType;
  deleteOptimisticProduct: any;
}) => {
  const router = useRouter();
  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/seller/store/edit-product/${product.id}`);
  };

  return (
    <Link
      href={`/seller/store/product/${product.id}`}
      className="flex  flex-col md:flex-row justify-between items-start md:items-center mb-2 shadow-md rounded-md dark:bg-gray-800 p-3"
    >
      <div className="flex w-full md:w-[70%]  gap-2">
        {/* <Image
          className="rounded-md w-[70px] h-[70px] md:w-auto md:h-auto"
          src={product.images[0]}
          alt="product image"
          height={100}
          width={100}
          style={{ width: "auto", height: "auto" }}
          /> */}
        <div className="w-[300px] h-[100px] relative">
          <Image
            className="rounded-md"
            src={product.images[0]}
            alt="product image"
            fill
            sizes="100vw"
            style={{objectFit:'cover'}}
          />
        </div>

        <div>
          <p className="dark:text-white">{product.name}</p>
          <p className="line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex md:w-[30%] justify-end mt-2 md:mt-0 w-full">
        <button
          className="text-xs md:text-sm px-4 py-0 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white md:px-5 md:py-2"
          onClick={(e) => handleEditClick(e)}
        >
          Edit
        </button>
        <button
          className="text-xs md:text-sm px-4 py-1 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white md:px-5 md:py-2"
          onClick={async (e) => {
            e.preventDefault();
            startTransition(() => {
              deleteOptimisticProduct(product.id);
            });
            await deleteProductAction(product.id);
          }}
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default SellerProductCard;
