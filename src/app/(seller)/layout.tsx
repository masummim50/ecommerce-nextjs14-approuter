import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import MyHeader from "../MyHeader";
import SellerSidebar from "@/components/layout/SellerSidebar";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('seller layout compo')
  return (
    <div className="flex">
      <SellerSidebar/>
      <div>

      <MyHeader />
      
      {children}
      </div>
    </div>
  );
};

export default SellerLayout;
