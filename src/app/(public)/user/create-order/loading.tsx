import { Spinner } from '@nextui-org/react';
import React from 'react';

const CreateOrderLoading = () => {
    return (
        <div className="max-w-[1100px] m-2 md:m-auto bg-gray-200 dark:bg-gray-800 h-[300px] flex justify-center items-center flex-col">
            <p>Calculating Order Items...</p>
            <Spinner />
        </div>
    );
};

export default CreateOrderLoading;