import React from "react";

const SellerOrderDetailsLoading = () => {
  return (
    <div className="p-2">
      <div className="mb-2 bg-gray-200 p-2 dark:bg-gray-800 rounded-md animate-pulse flex justify-between items-center">
        <div className="info flex flex-col gap-2 grow">
          <h2 className="h-[20px] w-[40%] rounded-md bg-gray-300 dark:bg-gray-700"></h2>
          <h2 className="h-[20px] w-[45%] rounded-md bg-gray-300 dark:bg-gray-700"></h2>
          <h2 className="h-[20px] w-[55%] rounded-md bg-gray-300 dark:bg-gray-700"></h2>
        </div>
        <h2 className="h-[40px] w-[100px] rounded-md bg-gray-400 dark:bg-gray-700"></h2>
      </div>
      <div className="mb-2 p-2  rounded-md animate-pulse flex flex-col">
        {Array(3)
          .fill("")
          .map((a, i) => {
            return (
              <div
                key={i}
                className="mb-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse flex gap-1"
              >
                <div className="bg-gray-300 dark:bg-gray-700 h-[100px] w-[100px] rounded-md"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-[20px] w-7 grow rounded-md"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-[20px] w-[40px] rounded-md"></div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-end">
        <div className="bg-gray-300 dark:bg-gray-700 h-[30px] w-[150px] rounded-md mt-2"></div>
      </div>
    </div>
  );
};

export default SellerOrderDetailsLoading;
