import DynamicLoading from '@/app/components/shared/DynamicLoading';
import { Spinner } from '@nextui-org/react';
import React from 'react';

const UserOrdersLoading = () => {
    return (
        <DynamicLoading text="Fetching orders"/>
    );
};

export default UserOrdersLoading;