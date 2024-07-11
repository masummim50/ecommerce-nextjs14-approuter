import { productType } from "@/app/interfaces/productInterface";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import ProductButtons from "./ProductButtons";
import Link from "next/link";
import ProductImages from "./ProductImages";
import ReviewCarousel from "@/app/(seller)/seller/store/product/[id]/ReviewCarousel";

const ProductDetails = ({ product }: { product: productType }) => {
  return (
    <div>
      <div className="min-h-1 mt-4 gap-5 flex justify-center bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        <div className="w-[40%]">
          <ProductImages images={product.images} />
        </div>

        <div className="w-[60%] flex flex-col justify-between ">
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
      {product?.reviews?.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 mt-3 p-2">
          {/* here add the embla carousel */}
          <h2 className="text-center m-2">Reviews</h2>
          <ReviewCarousel reviews={product.reviews} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100px] bg-white dark:bg-gray-800 rounded-md mt-2">
          No review Yet
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
