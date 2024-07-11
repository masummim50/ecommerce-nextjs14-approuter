import React from "react";

const SellerDashBoardLoading = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="h-full bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md"></div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[50px]"></div>
            <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[50px]"></div>
            <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[50px]"></div>
            <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[50px]"></div>
          </div>
          <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[100px] mt-2"></div>
        </div>
      </div>

      {/* second part */}
      <div className="mt-4 bg-gray-300 animate-pulse dark:bg-gray-800 h-[200px]">

      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[100px]"></div>
        <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[100px]"></div>
        <div className="bg-gray-300 animate-pulse dark:bg-gray-800 rounded-md h-[100px] col-span-2 md:col-span-1"></div>

      </div>
    </div>
  );
};

export default SellerDashBoardLoading;
