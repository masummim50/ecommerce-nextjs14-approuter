"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiTwotoneProfile } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";



const Icon = ()=> {
  return (
    <div>icon</div>
  )
}

const sellerSidebarLinks = [
  { icon: <LuLayoutDashboard />, title: "dashboard", url: "/seller/dashboard" },
  { icon: <AiTwotoneProfile />, title: "profile", url: "/seller/profile" },
  { icon: <FaStore />, title: "store", url: "/seller/store" },
  { icon: <IoMdInformationCircleOutline />, title: "info", url: "/seller/info" },
  { icon: <FaClipboardList />, title: "orders", url: "/seller/orders" },
];
const SellerSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[50px] md:w-[150px] transition-[width] duration-100 h-[100vh] sticky top-0 left-0 flex-col justify-start  rounded-sm text-black dark:text-white bg-[#f0f0f0] dark:bg-gray-800">
      <div className="text-center py-7">Logo</div>
      {sellerSidebarLinks.map((link, index) => (
        <Link
          className={`${
            pathname.includes(link.url) ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "hover:bg-slate-300 dark:hover:bg-gray-900"
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
