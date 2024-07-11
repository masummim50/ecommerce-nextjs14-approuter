import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const OrderDetailsLoading = () => {
    return (
        <DynamicLoading text="Fetching Order details"/>
    );
};

export default OrderDetailsLoading;