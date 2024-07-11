import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import SellerOrderDetailsContainer from "./SellerOrderDetailsContainer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description: "",
};

const SellerOrderDetails = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/order/${params.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await result.json();
  return (
    <div className="p-2 text-black dark:text-gray-400">
      <SellerOrderDetailsContainer orderDetails={data.data} />
    </div>
  );
};

export default SellerOrderDetails;
