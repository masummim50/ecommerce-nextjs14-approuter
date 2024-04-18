
import React from "react";

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
