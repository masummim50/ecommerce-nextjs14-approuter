"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="w-[100%] h-full relative items-center gap-2">
      {/* <img className="rounded-md max-h-[300px] " src={product?.images[0]} alt="product image" /> */}
      <Image
        height={300}
        width={300}
        // style={{height:'300px'}}
        className="rounded-md w-full max-h-[300px] h-[100px] md:h-[300px]"
        src={images[selectedImage]}
        alt="product image"
      />
      <div className="container gap-1 mt-1">
        {images.map((image, i) => {
          return (
            <div
              onClick={() => setSelectedImage(i)}
              key={i}
              className={`inline-block rounded-md border-2 md:border-3 ${i===selectedImage ? "border-indigo-500": "border-transparent"} rounded-md overflow-hidden`}
            >
              <Image
                height={50}
                width={50}
                src={image}
                alt={image}
                className="h-[25px] md:h-[50px] w-[30px] md:w-[60px]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
