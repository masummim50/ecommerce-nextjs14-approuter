import React from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const useAuthCookie = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
  let user = null;
  if (cookies.accessToken) {
    user = jwtDecode(cookies.accessToken) as {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  return { cookies, setCookies, removeCookies, user };
};

export default useAuthCookie;
