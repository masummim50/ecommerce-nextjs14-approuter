"use client";
import useAuthCookie from "@/auth-cookie/cookies";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import ToastContainer from "./components/shared/ToastContainer";

const Main = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { cookies } = useAuthCookie();
  const token = cookies.accessToken;
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setUser({ user: decoded, accessToken: token }));
    }
  }, [token, dispatch]);

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-[100vh]">
      <ToastContainer/>
      {children}</div>
  );
};

export default Main;
