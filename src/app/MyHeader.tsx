import React from 'react';
import DynamicLinks from './DynamicLinks';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link'

import { RootState } from '@/redux/store';
interface decodedUser  {
    id: string;
    name: string;
    email: string;
    role: string;
  }
const MyHeader = () => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    let user = null;
    if(token){
        user = jwtDecode(token) as {id:string,email:string, name:string, role:string};
    }

    return (
        <div className="bg-[#f0f0f0] shadow-md dark:bg-gray-800 dark:text-gray-400">

        <div className='flex justify-between max-w-[1100px] m-auto p-1'>
            <Link href="/" className="logo">Logo</Link>
            <DynamicLinks user={user}/>
        </div>
        </div>
    );
};

export default MyHeader;