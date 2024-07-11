import { baseUrl } from "@/shared/urls";
import React from "react";
import { productType } from "../interfaces/productInterface";
import PublicProductCard from "../components/product/PublicProductCard";
import PopularSectionCarousel from "./PopularSectionCarousel";
import ZeroFound from "@/components/shared/ZeroFound";

export const dynamic = "force-dynamic";
const NewArrivalSection = async () => {
  // const data = await fetch(`${baseUrl}/product/newest`);
  const data = await fetch(`${baseUrl}/product/newest`, {
    headers: { "Content-Type": "application/json" },
  });

  const products = await data.json();

  return (
    <div>
      {products.data.length > 0 ? (
        <PopularSectionCarousel products={products.data} />
      ) : (
        <ZeroFound text={"0 New items found"} />
      )}
    </div>
  );
};

export default NewArrivalSection;
