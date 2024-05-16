"use server";

import { productType } from "@/app/interfaces/productInterface";
import { baseUrl } from "@/shared/urls";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createStoreAction(createStoreData: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
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
  if (result.status !== 200) {
    return { message: data.message };
  }
  revalidatePath("/seller/store");
  redirect("/seller/store");
}
export async function createProductAction(createStoreData: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

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

export async function updateProductAction(
  productId: string,
  data: Partial<productType>
) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/product/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const returnedData = await result.json();

  revalidatePath("/seller/store");
  return returnedData;
}
export async function deleteProductAction(productId: string) {
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

  revalidatePath("/seller/store");
  return data;
}

export async function acceptOrderByIdAction(orderId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/order/accept/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();
  revalidatePath("/seller/orders");
  return data;
}

export async function shipOrderByIdAction(orderId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/order/ship/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();
  revalidatePath("/seller/orders");
  return data;
}

export async function cancelOrderByIdAction(orderId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/order/cancel/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();
  revalidatePath("/seller/orders");
  return data;
}
