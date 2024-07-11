import React from "react";

import { cookies } from "next/headers";
import {  orderType } from "@/app/interfaces/orderInterface";
import OrderCard from "./OrderCard";
import { baseUrl } from "@/shared/urls";
import { Metadata } from "next";
import ScrollToTop from "@/app/ScrollToTop";

export const metadata:Metadata = {
  title:'My Orders',
  description:''
}

export const dynamic = 'force-dynamic'

const MyOrders = async()=> {
    const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/user/orders`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache:'no-store'
  });
  
  const orders = await result.json();

    return (
        <div className="max-w-[1100px] m-auto text-black dark:text-gray-300 p-2">
          <ScrollToTop/>
          {
            orders?.data?.length > 0 ?
            <div>
            <h2>My orders:</h2>
            {
              orders?.data?.map((order:orderType)=> {
                return (
                  <OrderCard order={order} key={order.id}/>
                )
              })
            }
            </div> : 
            <div className="bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-300 h-[300px] w-full rounded-md flex justify-center items-center p-2 my-2 font-semibold text-lg">You have not placed any order yet</div>
          }
        </div>
    )
}

export default MyOrders;