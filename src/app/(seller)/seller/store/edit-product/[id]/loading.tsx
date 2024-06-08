import { Spinner } from '@nextui-org/react';
import React from 'react';

const EditProductLoading = () => {
    return (
        <div className="md:m-auto mx-2 mt-2 max-w-[1100px] bg-gray-300 dark:bg-gray-800 h-[300px] w-full flex flex-col justify-center items-center">
            <p>Fetching Product Data...</p>
            <Spinner/>
        </div>
    );
};

export default EditProductLoading;