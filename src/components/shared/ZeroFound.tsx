import React from 'react';

const ZeroFound = ({text}:{text:string}) => {
    return (
        <div className=" py-3 h-[200px] bg-gray-200 text-black dark:text-gray-300 rounded-md dark:bg-gray-800 flex justify-center items-center">
            {text}
        </div>
    );
};

export default ZeroFound;