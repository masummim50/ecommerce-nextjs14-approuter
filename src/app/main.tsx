"use client";
import useAuthCookie from "@/auth-cookie/cookies";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";

import React, { useEffect } from "react";
import ToastContainer from "./components/shared/ToastContainer";
import Link from "next/link";

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
      <ToastContainer />
      {children}

      {/* <Link
        target="_black"
        href={"https://masum-dev.vercel.app/contact"}
        passHref
        className=" text-black dark:text-white fixed bottom-0 right-0 m-2 px-4 py-1 backdrop-blur-sm rounded-md bg-cyan-500/40 dark:bg-cyan-400/30"
      >
        Contact Developer
      </Link> */}
    </div>
  );
};

export default Main;
