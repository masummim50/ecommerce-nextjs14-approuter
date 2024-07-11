import DynamicLoading from '@/app/components/shared/DynamicLoading';
import React from 'react';

const NewestPageLoading = () => {
    return (
        <DynamicLoading text="Fetching New Items"/>
    );
};

export default NewestPageLoading;