"use client"
import NextUiProvider from "@/app/NextUiProvider";
import React from "react";
import AuthProvider from "./AuthProvider";
import ThemeContextProvider from "./ThemeContextProvider";
import StoreProvider from "./StoreProvider";
import useAuthCookie from "@/auth-cookie/cookies";
import { jwtDecode } from "jwt-decode";

const Provider = ({ children }: { children: React.ReactNode }) => {

  return (
    <StoreProvider>
        <NextUiProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </NextUiProvider>
    </StoreProvider>
  );
  
};

export default Provider;
