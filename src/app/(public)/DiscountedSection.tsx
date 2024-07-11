import { baseUrl } from '@/shared/urls';
import React from 'react';
import PopularSectionCarousel from './PopularSectionCarousel';
import ZeroFound from '@/components/shared/ZeroFound';

export const dynamic = 'force-dynamic'
const DiscountedSection = async() => {
    const data = await fetch(`${baseUrl}/product/discounted`, {headers: {'Content-Type': 'application/json'}});
    const products = await data.json();

    return (
        <div>
             {
                products.data.length > 0 ?
                <PopularSectionCarousel products={products.data}/> 
                : 
                <ZeroFound text={'0 Discounted items found'}/>
            }
        </div>
    );
};

export default DiscountedSection;