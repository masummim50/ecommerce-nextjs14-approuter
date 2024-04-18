"use server";

import { baseUrl } from "@/shared/urls";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createStoreAction(createStoreData: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log("form data from createstore: ", createStoreData);
  //   const payload = {
  //     email: formData.get("email")?.toString(),
  //     password: formData.get("password")?.toString(),
  //   };
  const result = await fetch(
    "http://localhost:5000/api/v1/seller/createstore",
    {
      method: "POST",
      body: JSON.stringify(createStoreData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await result.json();
  console.log("create store data: ", data);
  if (result.status !== 200) {
    console.log(data.message);
    return { message: data.message };
  }
  revalidatePath("/seller/store");
  redirect("/seller/store");
}
export async function createProductAction(createStoreData: any) {
  console.log("starting create product action function");
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log("form data from createproduct: ", createStoreData);

  const result = await fetch("http://localhost:5000/api/v1/product/create", {
    method: "POST",
    body: JSON.stringify(createStoreData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();

  revalidateTag("sellerProducts");
  return data;
}
export async function deleteProductAction(productId: string) {
  console.log("starting delete product function");
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();
  console.log("delete data: ", data);

  revalidatePath("/seller/store");
  return data;
}
