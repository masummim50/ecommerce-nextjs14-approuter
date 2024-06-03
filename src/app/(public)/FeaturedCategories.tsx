import React from "react";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { title: "ram", color: "bg-orange-400", icon: <p>icon</p> },
];

const FeaturedCategories = () => {
  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
        
      <Link href="/product/category/ram" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/ram.png"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Ram
        </div>
      </Link>
        
      <Link href="/product/category/motherboard" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/motherboard.jpg"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          MotherBoard
        </div>
      </Link>
        
      <Link href="/product/category/processor" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/processor.jpg"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Processor
        </div>
      </Link>
        
      <Link href="/product/category/mobile" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/mobile.jpg"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Mobile
        </div>
      </Link>
        
      <Link href="/product/category/monitor" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/monitor.jpg"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Monitor
        </div>
      </Link>
        
      <Link href="/product/category/tablet" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/tablet.jpg"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Tablet
        </div>
      </Link>
        
      <Link href="/product/category/ram" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/ram.png"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Ram
        </div>
      </Link>
        
      <Link href="/product/category/ram" className="relative h-[100px] rounded-md overflow-hidden hover:shadow-md group">
        <Image className="absolute group-hover:scale-125 transition-all" src={"/ram.png"} fill alt="ram" />
        <div className="text-sm md:text-medium absolute z-30 border border-white backdrop-blur-sm text-white top-[50%] translate-y-[-50%] px-2 py-1 md:px-4 md:py-2 left-[50%] translate-x-[-50%] rounded-md">
          Ram
        </div>
      </Link>





    </div>
  );
};

export default FeaturedCategories;
