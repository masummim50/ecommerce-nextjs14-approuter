import PublicProductCardSkeleton from "@/app/components/skeletons/PublicProductCardSkeleton";
import React from "react";

const RelatedProductsLoading = () => {
  return (
    <div>
<h2 className="text-center">Fetching Related Products</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {Array(5)
        .fill("")
        .map((a, i) => {
            return <PublicProductCardSkeleton key={i} />;
            })}
    </div>
        </div>
  );
};

export default RelatedProductsLoading;
