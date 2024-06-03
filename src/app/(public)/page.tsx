// a section for most popular content
// a section to show some category links
// a section for newest arrivals

import { Suspense } from "react";
import PopularSection from "./PopularSection";
import NewArrivalSection from "./NewArrivalSection";
import Link from "next/link";
import FeaturedCategories from "./FeaturedCategories";
import DiscountedSection from "./DiscountedSection";

const PublicPage = () => {
  return (
    <div className="max-w-[1100px] m-auto mt-4 px-2">
      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-4 inline-block">Popular Items</h1>
          <Link
            href="/product/popular"
            className="bg-indigo-400 px-3 py-1 rounded-md hover:bg-indigo-500"
          >
            View All
          </Link>
        </div>
        <Suspense fallback={<p>loading popular contents</p>}>
          <PopularSection />
        </Suspense>
      </div>
      {/* newest arrivals: */}
      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-4 inline-block">Newest Arrival</h1>
          <Link
            href="/product/newest"
            className="bg-indigo-400 px-3 py-1 rounded-md hover:bg-indigo-500"
          >
            View All
          </Link>
        </div>
        <Suspense fallback={<p>loading new items</p>}>
          <NewArrivalSection />
        </Suspense>
      </div>

      {/* featured categories */}
      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-2 text-center w-full">Featured Categories</h1>
          
        </div>
        <FeaturedCategories />
      </div>

      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-4 inline-block">Discounted Items</h1>
          <Link
            href="/product/newest"
            className="bg-indigo-400 px-3 py-1 rounded-md hover:bg-indigo-500"
          >
            View All
          </Link>
        </div>
        <Suspense fallback={<p>loading new items</p>}>
          <DiscountedSection />
        </Suspense>
      </div>

      <div className="static h-[200px] bg-green-400">
        this is static content
      </div>
      <div className="static h-[200px] bg-green-500">
        this is static content
      </div>
    </div>
  );
};

export default PublicPage;
