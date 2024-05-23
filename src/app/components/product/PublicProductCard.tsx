import { productType } from "@/app/interfaces/productInterface";
import { reviewType } from "@/app/interfaces/reviewInterface";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

export const calculateRating = (reviews: reviewType[]) => {
  if (reviews?.length > 0) {
    let count = reviews.length;
    let rating = 0;
    reviews.forEach((review: reviewType) => {
      rating += review.rating;
    });
    rating = rating / count;
    return { count, rating };
  } else {
    return {
      count: 0,
      rating: 0,
    };
  }
};

const PublicProductCard = ({ product }: { product: productType }) => {
  const { count, rating } = calculateRating(product.reviews);
  return (
    // <div className="shadow-lg">
    //   <div className="relative h-[150px]">
    //     <Image src={product.images[0]} alt="product image" fill={true} />
    //     {
    //       product.discount &&
    //     <div className="absolute z-20 bg-sky-600/50 text-white font-bold rounded-lg px-3 py-1 right-0">{product.discount}% OFF</div>
    //     }
    //     <div className="blur-lg p-2 absolute bottom-0 left-0 z-30">
    //       <div className="flex justify-between">
    //         <h2 className="truncate grow">{product.name}</h2>
    //         <p>{product.price}</p>
    //       </div>
    //       <p className="line-clamp-2">{product.description}</p>
    //     </div>
    //   </div>
    //   <h1 className="text-[12px]">{product.name}</h1>
    //   <div className="text-sky-600 text-[11px]">
    //     ({count}) {rating}star {product.sales} item sold
    //   </div>
    // </div>
    <div className="group text-black dark:text-gray-300 bg-white dark:bg-gray-800">
      <div className=" shadow-lg relative h-[150px] bg-gray-200 rounded-md overflow-hidden">
        {/* put the image here */}
        <Image
          className="group-hover:scale-125  transition-all"
          src={product.images[0]}
          fill={true}
          alt={product.name}
        />

        {/* the blurry part */}
        {product.discount && (
          <div className="absolute top-0 right-0 z-20 py-2 bg-green-700/90 text-white px-2 rounded-md backdrop-blur-sm">
            <p className="text-xs text-white">{product.discount}% OFF</p>
          </div>
        )}
      </div>
      <div className="p-2">
        <h2 className="line-clamp-2 text-sm h-[40px]">{product.name}</h2>
        {product.discount ? (
          <p className="text-green-600 font-semibold">
            {" "}
            <span className="line-through text-gray-400 font-normal">
              ${product.price}
            </span>{" "}
            $
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}
          </p>
        ) : (
          <p className="text-indigo-500 font-semibold">${product.price}</p>
        )}

        {product?.reviews?.length > 0 ? (
          <div className="flex  items-center">
            {Array(rating)
              .fill("")
              .map((a, i) => {
                return <FaStar className="inline-block text-indigo-500" key={i} />;
              })}
            {Array(5 - rating)
              .fill("")
              .map((a, i) => {
                return (
                  <FaStar className="text-gray-300 inline-block" key={i} />
                );
              })}
            <div className="inline-block">({count})</div>
          </div>
        ) : (
          <div>
            <p className=" font-extralight dark:text-gray-400 text-gray-700">No review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProductCard;
