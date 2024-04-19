import React from "react";

import { cookies } from "next/headers";

const CartPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`http://localhost:5000/api/v1/product/cart`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  const data = await result.json();
  console.log("cart data: ", data);
  return <div className="max-w-[1100px] m-auto">this is cart page</div>;
};

export default CartPage;
