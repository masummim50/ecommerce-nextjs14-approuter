import PublicProductCardSkeleton from "@/app/components/skeletons/PublicProductCardSkeleton";
import React from "react";

const CategoryPageLoading = () => {
  return (
    <div className="max-w-[1100px] p-2 m-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {Array(10)
          .fill("")
          .map((a, i) => {
            return <PublicProductCardSkeleton key={i} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPageLoading;
