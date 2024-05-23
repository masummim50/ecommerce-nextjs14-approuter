import React from "react";

import { cookies } from "next/headers";

import CartContainer from "./CartContainer";
import { baseUrl } from "@/shared/urls";

const CartPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 text-black dark:text-gray-300 min-h-[100vh]">

    <div className="max-w-[1100px] m-auto">
      <CartContainer cartItems={data?.data} />
    </div>
    </div>
  );
};

export default CartPage;
