import { productType } from "@/app/interfaces/productInterface";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import ProductButtons from "./ProductButtons";
import Link from "next/link";

const ProductDetails = ({ product }: { product: productType }) => {
  return (
    <>
      <div className=" mt-4 gap-5 flex justify-center bg-white dark:bg-gray-800 p-4 rounded-md">
        <div className="w-[40%]">
          <div className="w-[100%] h-full relative items-center gap-2">
            {/* <img className="rounded-md max-h-[300px] " src={product?.images[0]} alt="product image" /> */}
            <Image height={300} width={300} style={{}} className="rounded-md w-full max-h-[300px]" src={product?.images[0]} alt="product image" />
          </div>
        </div>

        <div className="w-[60%] flex flex-col justify-between">
          <div className="info">
            <p className="text-sm md:text-2xl my-2">{product.name}</p>
            <div className="text-xs md:text-medium">
              <p>
                Category:{" "}
                <Link
                  className="bg-gray-300 px-3 py-[3px] rounded-md hover:bg-gray-400 text-indigo-500 dark:bg-gray-900 dark:hover:bg-black/50"
                  href={`category/${product.category}`}
                >
                  {" "}
                  {product.category}
                </Link>
              </p>
              <p>{product.stock} items in stock</p>
              <p>{product.sales} items sold</p>
              <p>
                Sold by:{" "}
                <Link
                  className="text-indigo-600 font-semibold"
                  href={`/store/${product.storeId}`}
                >
                  {product.store.name}
                </Link>
              </p>
            </div>
          </div>
          <div className="buttons flex flex-col md:flex-row items-start justify-between md:items-center">
            {product.discount ? (
              <p className="text-green-600 font-semibold">
                {" "}
                <span className="line-through text-gray-400 font-normal">
                  ${product.price}
                </span>{" "}
                $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </p>
            ) : (
              <p className="text-green-600 font-semibold">${product.price}</p>
            )}
            <ProductButtons product={product} />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md mt-2 text-sm md:text-medium">
        <div className="w-full md:w-[60%] ">
          <h2>Description:</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
