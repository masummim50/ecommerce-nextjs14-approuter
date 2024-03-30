"use client"
import React, { createContext, useState } from 'react';

export const roleContext = createContext({});
const RoleProviders = ({children}:{children:React.ReactNode}) => {
    const [role, setRole] = useState('seller');
    return (
        <roleContext.Provider value={[role, setRole]}>
            {children}
        </roleContext.Provider>
    );
};
export default RoleProviders;