import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import SellerOrderDetailsContainer from "./SellerOrderDetailsContainer";


const SellerOrderDetails = async({params}:{params:{id:string}})=> {
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
        <div className="p-2">
            <SellerOrderDetailsContainer orderDetails={data.data}/>
        </div>
    )
}


export default SellerOrderDetails;