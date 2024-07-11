import React from "react";
import PublicProductCardSkeleton from "../components/skeletons/PublicProductCardSkeleton";

const HomePageSuspenseSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      <div className="block">
        <PublicProductCardSkeleton />
      </div>
      <div className="block">
        <PublicProductCardSkeleton />
      </div>
      <div className="hidden sm:block">
        <PublicProductCardSkeleton />
      </div>
      <div className="hidden md:block">
        <PublicProductCardSkeleton />
      </div>
      <div className="hidden md:block">
        <PublicProductCardSkeleton />
      </div>
    </div>
  );
};

export default HomePageSuspenseSkeleton;
