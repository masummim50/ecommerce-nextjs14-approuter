import React from "react";

import { cookies } from "next/headers";

import CartContainer from "./CartContainer";
import { baseUrl } from "@/shared/urls";
import CartContainerCopy from "./CartContainerCopy";

const CartPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache:'no-store'
  });

  const data = await result.json();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 text-black dark:text-gray-300 min-h-[100vh]">

    <div className="max-w-[1100px] m-auto">
      {
        data?.data?.length > 0 ?
        <CartContainerCopy cartItems={data?.data} />

        : 
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-400 h-[200px] rounded-md">
          You have not added anything to cart

        </div>
      }
        </div>
    </div>
  );
};

export default CartPage;
