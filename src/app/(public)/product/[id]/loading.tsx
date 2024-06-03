import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#4b5563" highlightColor="#444">
    <div className="max-w-[1100px] m-auto p-2 text-black dark:text-gray-400">
      <div className=" mt-4 gap-5 flex justify-center bg-gray-300 dark:bg-gray-800 p-4 rounded-md">
        <div className="w-[40%]">
          <Skeleton height={300} />
        </div>

        <div className="w-[60%] flex flex-col justify-between">
          <div className="info">
            <p className="text-sm md:text-2xl my-2">
              <Skeleton width={200} />
            </p>
            <div className="text-xs md:text-medium">
              <p>
                Category: <Skeleton width={100} inline={true} />
              </p>
              <p>
                <Skeleton width={50} />
              </p>
              <p>
                <Skeleton width={50} />
              </p>
              <p>
                Sold by: <Skeleton width={100} inline={true} />
              </p>
            </div>
          </div>
          <div className="buttons flex flex-col md:flex-row items-start justify-between md:items-center">
            <Skeleton width={100} height={24} />
            <Skeleton width={100} height={24} />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md mt-2 text-sm md:text-medium">
        <div className="w-full md:w-[60%] ">
          <h2>Description:</h2>
          <Skeleton count={3} />
        </div>
      </div>
    </div>
    </SkeletonTheme>
  );
};

export default ProductSkeleton;
