import useAuthCookie from "@/auth-cookie/cookies";
import React from "react";
import { useCookies } from "react-cookie";

const useIsLoggedIn = () => {
  const { cookies } = useAuthCookie();
  const token = cookies.accessToken;
  if (token) {
    return true;
  }
  return false;
};

export default useIsLoggedIn;
