import { baseUrl } from '@/shared/urls';
import React from 'react';
import SellerProductDetails from './SellerProductDetails';

const ProductDetailsPage = async({params}:{params:{id:string}}) => {
    const result = await fetch(`${baseUrl}/product/forseller/${params.id}`);
    const data = await result.json();
    console.log("for seller: ", data);
    return (
        <div className="p-2 text-black dark:text-gray-400">
            {
                data?.data?.id ? 
                <SellerProductDetails product={data?.data}/>
            : <div>didt find anything </div>}
        </div>
    );
};

export default ProductDetailsPage;