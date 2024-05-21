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
      className="flex  flex-col md:flex-row justify-between items-start md:items-center mb-2 shadow hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md rounded-md dark:bg-gray-800 p-3 transition-all duration-75"
    >
      
      <div className="flex w-full md:w-[70%]  gap-2">
        
        <Image
        className="flex-shrink-0 flex-grow-0 rounded-sm"
          src={product.images[0]}
          alt="product image"
          height={100}
          width={100}
        />

        <div>
          <p className="dark:text-white text-xs md:text-lg">{product.name}</p>
          <p className="line-clamp-2 text-[10px] md:text-sm text-gray-500">
            {product.description}
          </p>
        </div>
      </div>

      <div className="flex md:w-[30%] justify-end mt-2 md:mt-0 w-full">
        <button
          className="text-xs md:text-sm  bg-indigo-500 hover:bg-indigo-600 rounded-md text-white px-4 py-1"
          onClick={(e) => handleEditClick(e)}
        >
          Edit
        </button>
        <button
          className="text-xs md:text-sm  bg-red-500 hover:bg-red-600 rounded-md  text-white px-4 py-1"
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
