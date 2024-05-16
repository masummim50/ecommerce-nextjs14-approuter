import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import OrderInfoDetails from "./OrderInfoDetails";

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const data = await fetch(`${baseUrl}/order/${params.id}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await data.json();
  return (
    <div className="bg-gray-100 h-[100vh]">
      <div className="max-w-[1100px] m-auto p-2">
        {/* {JSON.stringify(result)} */}
        <OrderInfoDetails details={result.data} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
