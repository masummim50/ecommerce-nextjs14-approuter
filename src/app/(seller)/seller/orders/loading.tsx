import React from "react";

const SellerOrdersLoading = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-2 gap-2">
        {Array(10)
          .fill("")
          .map((a, i) => {
            return (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 animate-pulse p-2"
              >
                <div className="w-full rounded-md mb-1 h-7 bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-[40%] rounded-md mb-1 h-7 bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <div className="h-[40px] w-[40px] rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-[40px] w-[40px] rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-[40px] w-[40px] rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-[20px] max-w-[100px] rounded-sm bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 max-w-[100px] rounded-md"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SellerOrdersLoading;
