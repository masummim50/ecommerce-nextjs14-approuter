import React from "react";

import { cookies } from "next/headers";

import CartContainer from "./CartContainer";
import { baseUrl } from "@/shared/urls";
import CartContainerCopy from "./CartContainerCopy";

import { Metadata } from "next";
import { isEmptyObject } from "@/helpers/checkEmptyObject";
import ScrollToTop from "@/app/ScrollToTop";

export const metadata: Metadata = {
  title: "My Cart",
  description: "",
};

const CartPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await result.json();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 text-black dark:text-gray-300 min-h-[500px]">
      <ScrollToTop/>
      <div className="max-w-[1100px] m-auto">
        {isEmptyObject(data?.data) ? (
          <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-400 h-[200px] rounded-md">
            You have not added anything to cart
          </div>
        ) : (
          <CartContainer cartItems={data?.data} />
        )}
      </div>
    </div>
  );
};

export default CartPage;
