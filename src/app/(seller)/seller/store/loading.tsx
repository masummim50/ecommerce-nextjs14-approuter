import React from 'react';

const SellerStoreLoading = () => {
    return (
        <div className=" bg-gray-400 m-2 animate-pulse p-2 text-white gap-3 flex flex-col items-center justify-start rounded-md">
            <div className="rounded-md bg-gray-500 h-8 w-[20%]"></div>
            <div className="rounded-md bg-gray-500 h-4 w-[5%]"></div>
            <div className="rounded-md bg-gray-500 h-4 w-[35%]"></div>
            <div className="rounded-md bg-gray-500 h-4 w-[25%]"></div>
        </div>
    );
};

export default SellerStoreLoading;