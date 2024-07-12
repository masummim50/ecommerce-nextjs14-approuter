import React from 'react';
import DynamicLinks from './DynamicLinks';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link'

import { RootState } from '@/redux/store';
import SearchBox from './SearchBox';
import Image from 'next/image';
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
        <div className="bg-[#f0f0f0] shadow-md dark:bg-gray-800 dark:text-gray-400 px-2">
<Link
        target="_black"
        href={"https://masum-dev.vercel.app/contact"}
        passHref
        className=" text-black dark:text-white fixed bottom-0 right-0 m-2 px-4 py-1 backdrop-blur-sm rounded-md bg-cyan-500/40 dark:bg-cyan-400/30 z-[1000]"
      >
        Contact Developer
      </Link>
        <div className='flex justify-between items-center max-w-[1100px] m-auto p-1'>
            <Link href="/" className="logo">
            <Image src={'/logo.png'} height={50} width={50} alt="logo"/>
            </Link>
            <div className="flex">
                <SearchBox />
            </div>
            <DynamicLinks user={user}/>
        </div>
        </div>
    );
};

export default MyHeader;