import { baseUrl } from '@/shared/urls';
import React from 'react';

const ProductDetailsPage = async({params}:{params:{id:string}}) => {
    const result = await fetch(`${baseUrl}/product/forseller/${params.id}`);
    const data = await result.json();
    return (
        <div>
            <pre>
                
                {JSON.stringify(data, null, 2)}
                </pre>
            this is product details page of {params.id}
        </div>
    );
};

export default ProductDetailsPage;