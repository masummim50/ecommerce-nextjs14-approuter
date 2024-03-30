"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const sellerSidebarLinks = [
  { icon: <MdDashboardCustomize />, title: "dashboard", url: "/seller" },
  { icon: <MdDashboardCustomize />, title: "profile", url: "/seller/profile" },
  { icon: <MdDashboardCustomize />, title: "store", url: "/seller/store" },
  { icon: <MdDashboardCustomize />, title: "info", url: "/seller/info" },
];
const SellerSidebar = () => {
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  return (
    // <div className="w-[50px] md:w-[150px] h-[calc(100vh-64px)] sticky top-[64px] left-0 flex-col justify-start  dark:bg-blue-500">
    //   {sellerSidebarLinks.map((link, index) => (
    //     <Link
    //       className={`${
    //         pathname === link.url ? "bg-blue-500 text-white" : ""
    //       } px-5 py-2 hover:bg-blue-500 rounded-lg mb-1 flex justify-between items-center`}
    //       key={index}
    //       href={`${link.url}`}
    //     >
    //       <span className="hidden md:inline-block">{link.title}</span>
    //       <span className="inline-block">{link.icon}</span>
    //     </Link>
    //   ))}
    // </div>

    <div className="w-[50px] md:w-[150px] transition-all duration-100 h-[100vh] sticky top-0 left-0 flex-col justify-start dark:bg-indigo-700 bg-gradient-to-tr from-indigo-500 to-indigo-300 rounded-sm text-white">
      <div className="text-center py-7">Logo</div>
      {sellerSidebarLinks.map((link, index) => (
        <Link
          className={`${
            pathname === link.url ? "bg-indigo-500 text-white" : ""
          } px-5 py-2  hover:bg-indigo-600 hover:text-white rounded-lg mb-1 flex justify-between items-center`}
          key={index}
          href={`${link.url}`}
        >
          <span className="hidden md:inline-block">{link.title}</span>
          <span className="inline-block">{link.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default SellerSidebar;
