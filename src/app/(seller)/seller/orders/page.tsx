import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import React from "react";
import OrdersContainer from "./OrdersContainer";

const SellerOrderPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/order`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const data = await result.json();

  return (
    <div className="bg-gray-100">
      <div className="p-2">
        {data?.data.length === 0 && (
          <div className="h-[200px] flex items-center justify-center shadow-lg p-2">
            No Orders yet
          </div>
        )}
        <OrdersContainer orders={data.data} />
      </div>
    </div>
  );
};

export default SellerOrderPage;
