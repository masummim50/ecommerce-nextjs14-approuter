import { productType } from "@/app/interfaces/productInterface";
import { reviewType } from "@/app/interfaces/reviewInterface";
import Image from "next/image";
import React from "react";

export const calculateRating = (reviews: reviewType[]) => {
  if (reviews.length > 0) {
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
    <div className="shadow-lg">
      <div className="relative h-[150px]">
        <Image src={product.images[0]} alt="product image" fill={true} />
        {
          product.discount &&
        <div className="absolute z-20 bg-sky-600/50 text-white font-bold rounded-lg px-3 py-1 right-0">{product.discount}% OFF</div>
        }
      </div>
      <h1 className="text-[12px]">{product.name}</h1>
      <div className="text-sky-600 text-[11px]">
        ({count}) {rating}star {product.sales} item sold
      </div>
    </div>
  );
};

export default PublicProductCard;
