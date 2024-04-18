"use client"
import { Button } from '@nextui-org/react';
import React from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const {pending} = useFormStatus();
    return (
        <Button type="submit">
            {pending ? 'creating...' : 'create product'}
        </Button>
    );
};

export default SubmitButton;