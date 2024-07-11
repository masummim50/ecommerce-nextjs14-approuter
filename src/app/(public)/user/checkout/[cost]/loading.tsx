import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const CheckoutLoadingPage = () => {
    return (
        <DynamicLoading text='Preparing payment Form...'/>
    );
};

export default CheckoutLoadingPage;