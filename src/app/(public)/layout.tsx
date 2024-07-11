import React from "react";
import MyHeader from "../MyHeader";
import Footer from "../Footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MyHeader />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
