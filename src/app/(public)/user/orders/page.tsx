import React from "react";

import { cookies } from "next/headers";
import {  orderType } from "@/app/interfaces/orderInterface";
import OrderCard from "./OrderCard";


const MyOrders = async()=> {
    const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`http://localhost:5000/api/v1/user/orders`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  const orders = await result.json();
  console.log("orders result: ", orders);
    return (
        <div className="max-w-[1100px] m-auto">
            <h2>My orders:</h2>
            {
              orders?.data?.map((order:orderType)=> {
                return (
                  <OrderCard order={order} key={order.id}/>
                )
              })
            }
        </div>
    )
}

export default MyOrders;