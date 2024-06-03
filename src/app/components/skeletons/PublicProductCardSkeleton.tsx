import { productType } from "@/app/interfaces/productInterface";
import { FaStarHalfAlt } from "react-icons/fa";
import { reviewType } from "@/app/interfaces/reviewInterface";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const PublicProductCardSkeleton = () => {
  return (
    <div className="group text-black dark:text-gray-300 bg-gray-300 dark:bg-gray-800">
      <div className="animate-pulse shadow-lg relative h-[130px] bg-gray-400 rounded-md overflow-hidden"></div>
      <div className="p-2">
        <h2 className="animate-pulse bg-gray-400  rounded-md h-[20px] mb-1"></h2>
        <h2 className="animate-pulse bg-gray-400  rounded-md h-[20px] mb-1"></h2>

        <p className="bg-gray-400 w-[25%] h-[20px] animate-pulse rounded-md mb-1"></p>
        <p className="bg-gray-400 w-[45%] h-[20px] animate-pulse rounded-md"></p>

      </div>
    </div>
  );
};

export default PublicProductCardSkeleton;
