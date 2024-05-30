
"use client"

import { FaStar } from "react-icons/fa";
import { reviewType } from "@/app/interfaces/reviewInterface";
import { Avatar } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import React from 'react';
import { DiJavascript1 } from "react-icons/di";

const ReviewCarousel = ({reviews}:{reviews:reviewType[]}) => {
    const [emblaRef] = useEmblaCarousel({ loop: false });
    return (
        <div>
            <div className="embla " ref={emblaRef}>
        <div className="embla__container gap-2">
          {reviews?.map((review: reviewType) => {
            return (
              <div key={review.id} className="embla__slide shadow hover:shadow-lg rounded-md bg-white p-2 dark:bg-gray-900 text-black dark:text-gray-400">
                <div className="user flex items-center justify-start">
                    <Avatar name={review?.user?.name}  size="sm"/>
                    <p className="text-medium line-clamp-1">{review?.user?.name}</p>
                </div>
                <div className="rating flex">
                    {
                        Array(review.rating).fill("").map((a,i)=> <FaStar className="text-indigo-500" key={i} />)
                    }
                    {
                        Array(5-review.rating).fill("").map((a,i)=> <FaStar className="text-gray-500" key={i} />)
                    }
                </div>
                <div className="review">
                    {review.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
        </div>
    );
};

export default ReviewCarousel;