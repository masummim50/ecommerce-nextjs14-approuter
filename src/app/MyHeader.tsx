import React from 'react';
import DynamicLinks from './DynamicLinks';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from '@/redux/hooks';

import { RootState } from '@/redux/store';
interface decodedUser  {
    id: string;
    name: string;
    email: string;
    role: string;
  }
const MyHeader = () => {
    console.log("my header compo")
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    let user = null;
    if(token){
        user = jwtDecode(token) as {id:string,email:string, name:string, role:string};
    }

    return (
        <div className='flex justify-between max-w-[1100px] m-auto'>
            <div className="logo">Logo</div>
            <DynamicLinks user={user}/>
        </div>
    );
};

export default MyHeader;