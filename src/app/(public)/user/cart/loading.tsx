import React from "react";

const CartLoading = () => {
  return (
    <div className="m-auto max-w-[1100px] mt-4 p-2">
      <div className="flex gap-3">
        <div className="w-[100%] md:w-[60%] flex flex-col gap-2 ">
          {Array(4)
            .fill("")
            .map((a, i) => {
              return (
                <div key={i} className="w-full mb-2 relative animate-pulse bg-gray-100">
                  <div className="inline-flex w-full max-w-[100%] bg-white dark:bg-gray-800 mb-1 shadow-md justify-start cursor-pointer rounded-lg gap-2 border-transparent">
                    <div className="w-[100%] flex relative">
                      <div className="absolute top-0 right-0 text-red-600 z-40 p-2 border rounded-full bg-red-100 hover:bg-red-200"></div>
                      <div className="flex w-[100%]">
                        <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="grow flex flex-col px-4 py-2">
                          <div className="info">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-[80%]"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-[60%]"></div>
                          </div>
                          <div className="flex justify-between mt-4">
                            <div className="price h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                            <div className="quantity flex items-center space-x-2">
                              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="animate-pulse w-[100%] min-h-[100px] fixed z-50 md:w-[40%] md:relative bottom-0 left-0  mb-1 p-2 md:p-0 bg-gray-200 dark:bg-gray-800 rounded-md">

        </div>
      </div>
    </div>
  );
};

export default CartLoading;
