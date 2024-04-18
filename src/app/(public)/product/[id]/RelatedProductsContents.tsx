import React from 'react';
import { productType } from '@/app/interfaces/productInterface';

const RelatedProductsContents = ({products}:{products:productType[]}) => {
    return (
        <div>
            {products.length} related products found
        </div>
    );
};

export default RelatedProductsContents;