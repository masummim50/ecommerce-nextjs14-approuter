import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const PopularPageLoading = () => {
    return (
        <DynamicLoading text="Fetching Popular Items"/>
    );
};

export default PopularPageLoading;