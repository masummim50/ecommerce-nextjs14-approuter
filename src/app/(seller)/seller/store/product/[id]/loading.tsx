import React from 'react';

const SellerProductDetailsLoading = () => {
    return (
        <div className='p-2'>
      <div className="mt-4 gap-5 flex justify-center bg-white dark:bg-gray-800 p-4 rounded-md animate-pulse">
        <div className="w-[40%]">
          <div className="w-full h-40 md:h-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="w-[60%] flex flex-col justify-between">
          <div className="info">
            <p className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md my-2"></p>
            <div className="space-y-2">
              <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>
          </div>
          <div className="buttons flex flex-col md:flex-row items-start justify-between md:items-center mt-4">
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="mt-2 md:mt-0 md:ml-4 h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md mt-2 animate-pulse">
        <div className="w-full md:w-[60%]">
          <h2 className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></h2>
          <p className="mt-2 h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></p>
          <p className="mt-2 h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></p>
          <p className="mt-2 h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 mt-3 p-2 animate-pulse">
        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
    );
};

export default SellerProductDetailsLoading;