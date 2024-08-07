// a section for most popular content
// a section to show some category links
// a section for newest arrivals

import { Suspense } from "react";
import PopularSection from "./PopularSection";
import NewArrivalSection from "./NewArrivalSection";
import Link from "next/link";
import FeaturedCategories from "./FeaturedCategories";
import DiscountedSection from "./DiscountedSection";
import BannerSection from "./BannerSection";
import HomePageSuspenseSkeleton from "./HomePageSuspenseSkeleton";

export const revalidate = 60


const PublicPage = () => {
  return (
    <div className="max-w-[1100px] m-auto mt-4 px-2">
      <div className="mb-2">
        <BannerSection />
      </div>

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
        <Suspense fallback={<HomePageSuspenseSkeleton/>}>
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
        <Suspense fallback={<HomePageSuspenseSkeleton/>}>
          <NewArrivalSection />
        </Suspense>
      </div>

      {/* featured categories */}
      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-2 text-center w-full">
            Featured Categories
          </h1>
        </div>
        <FeaturedCategories />
      </div>

      <div>
        <div className="flex justify-between mb-2 text-black dark:text-gray-300 items-center">
          <h1 className="text-large border-b-4 inline-block">
            Discounted Items
          </h1>
          <Link
            href="/product/discounted"
            className="bg-indigo-400 px-3 py-1 rounded-md hover:bg-indigo-500"
          >
            View All
          </Link>
        </div>
        <Suspense fallback={<HomePageSuspenseSkeleton/>}>
          <DiscountedSection />
        </Suspense>
      </div>
    </div>
  );
};

export default PublicPage;
