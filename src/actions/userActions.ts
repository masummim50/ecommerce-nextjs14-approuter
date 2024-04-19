"use server";
import { cookies } from "next/headers";

export async function addProductToCartAction(productId: string) {
  console.log("starting create product action function");
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
