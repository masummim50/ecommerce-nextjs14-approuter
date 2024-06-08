import { baseUrl } from '@/shared/urls';
import React from 'react';
import { productType } from '../interfaces/productInterface';
import PublicProductCard from '../components/product/PublicProductCard';
import PopularSectionCarousel from './PopularSectionCarousel';

export const dynamic = 'force-dynamic'

const PopularSection = async() => {
    const data = await fetch(`${baseUrl}/product/popular`, {cache: 'no-store'});
    const products = await data.json();

    return (
        <div>
            <PopularSectionCarousel products={products.data}/>
        </div>
    );
};

export default PopularSection;