"use server";
import { baseUrl } from "@/shared/urls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addProductToCartAction(productId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/product/addtocart/${productId}`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return data;
}
export async function increaseQuantityOfCartItemAction(cartItemId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/product/cart/increase/${cartItemId}`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return data;
}
export async function decreaseQuantityOfCartItemAction(cartItemId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/product/cart/decrease/${cartItemId}`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return data;
}
export async function createOrderAction(orderItems: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(
    `http://localhost:5000/api/v1/order/create-order`,
    {
      method: "POST",
      body: JSON.stringify(orderItems),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return data;
}

export async function orderReceivedAction(orderId: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/order/deliver/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  revalidatePath("/user/orders/[id]");

  return data;
}
