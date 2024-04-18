import { productType } from '@/app/interfaces/productInterface';
import { baseUrl } from '@/shared/urls';
import React from 'react';
import SellerProductCard from './SellerProductCard';
import ProductsContainer from './ProductsContainer';

const Products = async ({storeId}:{storeId:string}) => {
    const result = await fetch(`${baseUrl}/product/store/${storeId}`, {
        method: "GET",
        
        credentials: "include",
        next:{tags:['sellerProducts']}
      });
      const data = await result.json();
      console.log("product from products component", data)
    return (
        <div>
            <ProductsContainer products={data.data}/>
        </div>
    );
};

export default Products;