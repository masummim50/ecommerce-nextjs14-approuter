import { baseUrl } from '@/shared/urls';
import React from 'react';
import PopularSectionCarousel from './PopularSectionCarousel';

const DiscountedSection = async() => {
    const data = await fetch(`${baseUrl}/product/discounted`);
    const products = await data.json();

    return (
        <div>
            <PopularSectionCarousel products={products.data}/>
        </div>
    );
};

export default DiscountedSection;