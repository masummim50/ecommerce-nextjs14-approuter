import { FaStar } from "react-icons/fa";

export const ProductsLoading = () => {
  return (
    <div>
      {Array(5)
        .fill("")
        .map((a, i) => {
          return (
            <div
              key={i}
              className="flex flex-col bg-gray-200 dark:bg-gray-800 md:flex-row justify-between items-start md:items-center mb-2 shadow rounded-md p-3 animate-pulse"
            >
              <div className="flex w-full md:w-[70%] gap-2">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-sm"></div>
                <div className="flex flex-col space-y-2">
                  <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="flex items-center space-x-1">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <FaStar className="text-gray-300" key={i} />
                      ))}
                    <div className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex md:w-[30%] justify-end mt-2 md:mt-0 w-full space-x-2">
                <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
