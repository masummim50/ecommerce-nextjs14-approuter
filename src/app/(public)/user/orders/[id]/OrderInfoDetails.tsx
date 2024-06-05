"use client"
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import OrderTimeline from "./OrderTimeline";
import MarkAsReceivedButton from "./MarkAsReceivedButton";
import ItemsSection from "./ItemsSection";
import { useOptimistic } from "react";

function estimateDelivery(dateString: string): string {
  // Parse the input string to a Date object
  const date = new Date(dateString);

  // Increase the date by 7 days
  date.setDate(date.getDate() + 7);

  // Convert the date back to ISO 8601 format
  const newDateString = date.toISOString();

  // Return the new date string
  return newDateString;
}

type itemType = {
  storeId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImages: string[];
  productQuantity: number;
};
type storeType = {
  id: string;
  name: string;
  description: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
};
export type orderDetailsType = {
  id: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  storeId: string;
  paymentStatus: "due";
  paymentMethod: "cash";
  paymentAmount: number;
  userId: string;
  items: itemType[];
  createdAt: string;
  updatedAt: string;
  Store: storeType;
};

const OrderInfoDetails = ({ details }: { details: orderDetailsType }) => {
  const [OptimisticDetails, receiveOptimistic] = useOptimistic<
    orderDetailsType,
    string
  >(details, (state) => {
    state.status = 'delivered';
    return {...state};
  });
  return (
    <div>
      <h2>Order details:</h2>
      <div className="p-2 shadow-md flex justify-between items-center mb-2 bg-white dark:bg-gray-800">
        <div>
          <p>Order #{OptimisticDetails.id}</p>
          <p>Order Placed on: {formatDate(OptimisticDetails.createdAt)}</p>
        </div>
        <div>
          <p>Total: ${OptimisticDetails.paymentAmount}</p>
        </div>
      </div>
      <div className="p-2 border-b-[1px] border-gray-300 bg-white dark:bg-gray-800">
        <h2>Package 1</h2>
        <p>
          Sold by{" "}
          <Link href={`/store/${OptimisticDetails.storeId}`}>{OptimisticDetails.Store.name}</Link>
        </p>
      </div>
      <div className="p-2 mb-2 bg-white flex justify-between dark:bg-gray-800">
        <h2>
          {OptimisticDetails.status === "delivered"
            ? `Delivered On ${formatDate(OptimisticDetails.updatedAt)}`
            : `Estimated Delivery date: ${formatDate(
                estimateDelivery(OptimisticDetails.updatedAt)
              )}`}
        </h2>
        {OptimisticDetails.status === "shipped" && (
          <MarkAsReceivedButton optimisticUpdate={receiveOptimistic} id={OptimisticDetails.id} />
        )}
      </div>
      <OrderTimeline status={OptimisticDetails.status} date={OptimisticDetails.updatedAt} />
      <ItemsSection details={details} />
    </div>
  );
};

export default OrderInfoDetails;
