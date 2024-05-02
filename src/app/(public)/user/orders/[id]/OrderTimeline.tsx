import { formatDate } from "@/helpers/formatDate";
import React from "react";

const OrderTimeline = ({
  status,date
}: {
  status: "pending" | "confirmed" | "shipped" | "delivered", date:string
}) => {
  return (
    <div className="bg-white">
    <div className="flex flex-col p-2 max-w-[500px] m-auto">
      <div className="flex items-center px-8">
        <div
          className={`box w-[20px] h-[20px] border-1 rounded-full ${
            status === "confirmed" || "pending" ? "bg-green-500 border-green-500 " : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`line grow h-[4px] bg-gray-400 ${
            status === "shipped" && "bg-green-500"
          }`}
        ></div>
        <div
          className={`box w-[20px] h-[20px]  border-1 rounded-full ${
            status === "shipped" ? "bg-green-500 border-green-500" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`line grow h-[4px] bg-gray-400 ${
            status === "delivered" && "bg-green-500"
          }`}
        ></div>
        <div
          className={`box w-[20px] h-[20px]  border-1 rounded-full ${
            status === "delivered" ? "bg-green-500 border-green-500" : "bg-gray-400"
          }`}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <p>Processing</p>
        <p>Shipped</p>
        <p>Delivered</p>
      </div>
    </div>
    <div className="p-4 rounded-md border-gray-500 border-1 max-w-[700px] m-auto bg-gray-200">
       <span className="text-sm text-gray-500"> {formatDate(date,false)}</span> {
            status === 'pending' ? 'Your Order is being reviewed' : status ==='confirmed' ? 'Order confirmed, Your package is being prepared' : status ==='shipped' ? 'Your package has been shipped' : 'Package has been delivered'
        }
    </div>
    </div>
  );
};

export default OrderTimeline;
