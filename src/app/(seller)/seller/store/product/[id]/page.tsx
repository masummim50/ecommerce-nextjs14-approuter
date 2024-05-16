import React from 'react';

const ProductDetailsPage = ({params}:{params:{id:string}}) => {
    return (
        <div>
            this is product details page of {params.id}
        </div>
    );
};

export default ProductDetailsPage;