"use client"
import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

const NextUiProvider = ({children}:{children:React.ReactNode}) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
};

export default NextUiProvider;