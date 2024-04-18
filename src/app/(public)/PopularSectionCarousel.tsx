"use client";
import React, { useEffect } from "react";
import { productType } from "../interfaces/productInterface";
import PublicProductCard from "../components/product/PublicProductCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
const PopularSectionCarousel = ({ products }: { products: productType[] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay:1000, stopOnMouseEnter:true,stopOnInteraction:false})]);

  return (
    <div className="mb-5">
      <div className="embla " ref={emblaRef}>
        <div className="embla__container ">
          {products.map((product: productType) => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} className="embla__slide shadow hover:shadow-lg">
                <PublicProductCard product={product} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularSectionCarousel;
