import { productType } from '@/app/interfaces/productInterface';
import React from 'react';

const SellerProductCard = ({product}:{product:productType}) => {
    return (
        <div>
            <h2>{product.id}</h2>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
    );
};

export default SellerProductCard;