import { productType } from "@/app/interfaces/productInterface";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import ProductButtons from "./ProductButtons";

const ProductDetails = ({ product }: { product: productType }) => {
  return (
    <>
      <div className=" mt-4 gap-5 flex justify-center">
        <div className="w-[40%]">
          <div className="w-[100%] h-full relative items-center gap-2">
            <img src={product?.images[0]} alt="product image" />
          </div>
        </div>

        <div className="w-[60%] flex flex-col justify-between">
          <div className="info">
            <p className="text-2xl">{product.name}</p>
            <p>Category: {product.category}</p>
            <p>{product.stock} items in stock</p>
            <p>{product.sales} items sold</p>
          </div>
          <div className="buttons flex justify-between items-center">
            <div className="price">{product.price} USD</div>
            <ProductButtons product={product}/>
          </div>
        </div>
      </div>
      <div className="w-[60%]">
        <h2>Description:</h2>
        <p>{product.description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
