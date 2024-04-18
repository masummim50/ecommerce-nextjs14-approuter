import { baseUrl } from '@/shared/urls';
import React from 'react';
import RelatedProductsContents from './RelatedProductsContents';
import { productType } from '@/app/interfaces/productInterface';

const RelatedProducts = async({category, currentProductId}:{category:string, currentProductId:string}) => {
    
    // do the fetch request here
    const data = await fetch(`${baseUrl}/product/category/${category}`);
    const result = await data.json();
    console.log("related p: ", result)
    return (
        <div>
            <h2>Other Products you might like</h2>
            {/* related products will go here {result.data?.length} */}
            <RelatedProductsContents products={result.data.filter((product:productType)=> product.id !== currentProductId)} />
        </div>
    );
};

export default RelatedProducts;