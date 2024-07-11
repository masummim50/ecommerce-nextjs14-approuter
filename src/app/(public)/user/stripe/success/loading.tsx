import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const StripeSuccessLoading = () => {
    return (
        <DynamicLoading text='Payment information loading...' />
    );
};

export default StripeSuccessLoading;