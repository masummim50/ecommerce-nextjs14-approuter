import { Spinner } from '@nextui-org/react';
import React from 'react';

const DynamicLoading = ({text}:{text:string}) => {
    return (
        <div className="max-w-[1100px] m-2 md:m-auto bg-gray-200 text-black dark:text-slate-300 dark:bg-gray-800 h-[250px] flex justify-center items-center flex-col">
            <p>{text}</p>
            <Spinner />
        </div>
    );
};

export default DynamicLoading;
