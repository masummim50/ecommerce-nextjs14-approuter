import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import MyHeader from "../MyHeader";
import SellerSidebar from "../components/layout/SellerSidebar";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1">
        <MyHeader />

        {children}
      </div>
    </div>
  );
};

export default SellerLayout;
