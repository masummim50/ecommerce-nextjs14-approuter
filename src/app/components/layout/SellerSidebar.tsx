"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const sellerSidebarLinks = [
  { icon: <MdDashboardCustomize />, title: "dashboard", url: "/seller/dashboard" },
  { icon: <MdDashboardCustomize />, title: "profile", url: "/seller/profile" },
  { icon: <MdDashboardCustomize />, title: "store", url: "/seller/store" },
  { icon: <MdDashboardCustomize />, title: "info", url: "/seller/info" },
  { icon: <MdDashboardCustomize />, title: "orders", url: "/seller/orders" },
];
const SellerSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[50px] md:w-[150px] transition-all duration-100 h-[100vh] sticky top-0 left-0 flex-col justify-start  rounded-sm text-black dark:text-white bg-[#f0f0f0]">
      <div className="text-center py-7">Logo</div>
      {sellerSidebarLinks.map((link, index) => (
        <Link
          className={`${
            pathname.includes(link.url) ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "hover:bg-slate-300"
          } px-5 py-2  rounded-lg mb-1 flex justify-between items-center`}
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
