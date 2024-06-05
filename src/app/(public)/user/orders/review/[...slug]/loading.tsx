import React from "react";

const ReviewFormLoading = () => {
  return (
    <div className="max-w-[500px] w-full h-auto mx-auto bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md mt-2">
      <div className=" flex items-center gap-3 justify-center w-[80%] h-8 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700 m-auto"></div>
      <div className="flex justify-center items-center w-[70px] p-2 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700 m-auto h-7 my-2"></div>
      <div className="animate-pulse text flex items-center justify-center bg-gray-400 dark:bg-gray-600 m-auto h-[200px] rounded-md">
  
      </div>
      <div className="flex justify-end ">
        <div className="bg-gray-300 dark:bg-gray-700 h-[40px] w-[80px] mt-2 rounded-md animate-pulse">

        </div>
      </div>
    </div>
  );
};

export default ReviewFormLoading;
