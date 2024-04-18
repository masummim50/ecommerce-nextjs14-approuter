import useAuthCookie from "@/auth-cookie/cookies";
import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import { Button } from "@nextui-org/react";
import StoreNotFound from "@/app/components/seller/StoreNotFound";
import StoreFound from "@/app/components/seller/StoreFound";
import Products from "./Products";
import { Suspense } from "react";
import { ProductsLoading } from "./ProductsLoading";



async function SellerStorePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/seller/store`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const data = await result.json();

  return (
    <div className="p-2">
      {data?.data ? <StoreFound store={data.data} /> : <StoreNotFound />}
      <div className="p-2">
        <Suspense fallback={<ProductsLoading />}>
          <Products storeId={data?.data?.id} />
        </Suspense>
      </div>
    </div>
  );
}

export default SellerStorePage;

