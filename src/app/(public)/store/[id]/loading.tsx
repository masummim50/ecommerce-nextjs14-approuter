import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const StoreLoading = () => {
    return (
        <DynamicLoading text="Fetching store data"/>
    );
};

export default StoreLoading;