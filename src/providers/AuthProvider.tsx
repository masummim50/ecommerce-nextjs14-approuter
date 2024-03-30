"user client"

import useAuthCookie from '@/auth-cookie/cookies';
import React, { createContext, useState } from 'react';

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const {cookies, removeCookies, setCookies} = useAuthCookie();
    const [userLoggedIn, setUserLoggedIn] = useState(cookies.accessToken);
    const authContext = createContext({userLoggedIn, setUserLoggedIn})
    
    // here access the localstorage for the accesstoken and decode it and set the value to the context api so if the user is logged in its shown everywhere. 


    // const token = localStorage.getItem('accessToken');
    // if(token)
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;