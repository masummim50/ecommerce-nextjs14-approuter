"use server";

import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const payload = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  const result = await fetch(`${baseUrl}/auth/user/signin`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await result.json();
  if (result.status !== 200) {
    return { message: data.message };
  }
  cookies().set("accessToken", data.data.accessToken, { maxAge: 360000 });
  const redirectUrl = cookies().get("redirectUrl")?.value;
  redirect(redirectUrl || "/");
  // redirect("/");
}

export async function signUpAction(prevState: any, formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  const result = await fetch(`${baseUrl}/auth/user/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await result.json();
  if (result.status !== 200) {
    return { message: data.message };
  }
  redirect("/login");
}
export async function sellerSignUpAction(prevState: any, formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  const result = await fetch(`${baseUrl}/auth/seller/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await result.json();
  if (result.status !== 200) {
    return { message: data.message };
  }
  redirect("/login?tab=seller");
}
export async function sellerLoginAction(prevState: any, formData: FormData) {
  const payload = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  const result = await fetch(`${baseUrl}/auth/seller/signin`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await result.json();
  if (result.status !== 200) {
    return { message: data.message };
  }
  cookies().set("accessToken", data.data.accessToken, { maxAge: 360000 });
  // redirect("/seller/dashboard");
  const redirectUrl = cookies().get("redirectUrl")?.value;
  redirect(redirectUrl || "/seller/dashboard");
}

export async function logoutAction(pathname: string) {
  cookies().delete("accessToken");
  cookies().delete("redirectUrl");
  // if pathname contains user or seller then redirect to home
  // else its a public page so redirect to pathname
  if (pathname.startsWith("/user") || pathname.startsWith("/seller")) {
    redirect("/");
  } else {
    redirect(pathname);
  }
}

export async function setRedirect(pathname: string) {
  try {
    cookies().set("redirectUrl", pathname);
  } catch (error) {
    return null;
  }
}
