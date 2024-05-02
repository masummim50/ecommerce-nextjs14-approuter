import { baseUrl } from '@/shared/urls';
import React from 'react';
import { productType } from '../interfaces/productInterface';
import PublicProductCard from '../components/product/PublicProductCard';
import PopularSectionCarousel from './PopularSectionCarousel';

const NewArrivalSection = async() => {
    const data = await fetch(`${baseUrl}/product/newest`);
    const products = await data.json();

    console.log("popular items: ", products)
    return (
        <div>
            <PopularSectionCarousel products={products.data}/>
        </div>
    );
};

export default NewArrivalSection;