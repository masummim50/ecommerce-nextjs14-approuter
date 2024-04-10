import useAuthCookie from "@/auth-cookie/cookies";
import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import {Button} from '@nextui-org/react'
import StoreNotFound from "@/app/components/seller/StoreNotFound";
import StoreFound from "@/app/components/seller/StoreFound";




async function SellerStorePage() {
    const cookieStore = cookies()
    const token =  cookieStore.get("accessToken")?.value;
    console.log("token from cookiestore: ", token);
    const result = await fetch(`${baseUrl}/seller/store`, {
        method:'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        } ,
        credentials:'include'
    })
    const data = await result.json();

    console.log("result from store page: ", data);
    return (
        <div className="p-2">
            {
                data?.data ? <StoreFound store={data.data}/> : <StoreNotFound/>
            }
        </div>
    )
}

export default SellerStorePage;