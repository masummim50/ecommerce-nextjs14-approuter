"use server";
import { baseUrl } from "@/shared/urls";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addProductToCartAction(productId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    cookies().set("redirectUrl", `/product/${productId}`);
    redirect(`/login`);
  }

  const result = await fetch(`${baseUrl}/product/addtocart/${productId}`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  revalidatePath("/user/cart");

  return data;
}
export async function increaseQuantityOfCartItemAction(cartItemId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart/increase/${cartItemId}`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  revalidatePath("/user/cart");
  return data;
}
export async function decreaseQuantityOfCartItemAction(cartItemId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart/decrease/${cartItemId}`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  revalidatePath("/user/cart");

  return data;
}

export async function removeCartItemAction(cartItemId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/product/cart/delete/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  revalidatePath("/user/cart");

  return data;
}

export async function createOrderAction(
  orderItems: any,
  paymentMethod: string
) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/order/create-order`, {
    method: "POST",
    body: JSON.stringify({ orderItems, paymentMethod }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  revalidatePath("/user/orders");
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

  revalidatePath("/user/orders");
  revalidatePath(`/user/orders/${orderId}`);

  return data;
}

export async function addReviewAction(productId: string, review: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/review/create/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  const data = await result.json();
  revalidatePath(`/product/${productId}`);
  return data;
}

export async function updateReviewAction(
  reviewId: string,
  review: any,
  productId: string
) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/review/update/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  const data = await result.json();
  // send productid to revalidate that data
  revalidatePath(`/product/${productId}`);

  return data;
}

export async function followStoreAction(storeId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/user/followstore/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  revalidateTag("userStoreInformation");
  return data;
}

export async function unFollowStoreAction(storeId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/user/unfollowstore/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  revalidateTag("userStoreInformation");
  return data;
}
