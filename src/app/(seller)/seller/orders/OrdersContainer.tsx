import { formatDate } from "@/helpers/formatDate";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import React from "react";
import Link from "next/link";

type Product = {
  storeId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImages: string[];
  productQuantity: number;
};

export type SellerOrder = {
  id: string;
  status: string;
  storeId: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentAmount: number;
  userId: string;
  items: Product[];
  createdAt: string;
  updatedAt: string;
};

const OrdersContainer = ({ orders }: { orders: SellerOrder[] }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {orders.map((order) => {
          return (
            <Link
              href={`/seller/orders/${order.id}`}
              className="bg-white shadow-lg hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 rounded-md"
              key={order.id}
            >
              <div className="p-2">
                <h2 className="truncate">Order #{order.id}</h2>
                <p className="">Placed on: {formatDate(order.createdAt)}</p>
              </div>
              <Divider />
              <div className="px-2 flex justify-between">
                {/* load some images to show how many items */}
                <AvatarGroup className="p-2">
                  {order.items.map((item) => {
                    return (
                      <div key={item.productId}>
                        <Avatar src={item.productImages[0]} />
                      </div>
                    );
                  })}
                </AvatarGroup>
                <div className="">
                  <h2>
                    Total:{" "}
                    {order.items.reduce(
                      (prev, curr) => prev + curr.productQuantity,
                      0
                    )}{" "}
                    items
                  </h2>
                  <h2>${order.paymentAmount}</h2>
                </div>
              </div>
              <Divider />
              <div className="p-2">
                <h2
                  className={`text-sm text-white px-3 py-1 ${
                    order.status === "pending"
                      ? "bg-gray-400"
                      : order.status === "confirmed"
                      ? "bg-sky-500"
                      : order.status === "shipped"
                      ? "bg-orange-400"
                      : order.status === "canceled"
                      ? "bg-red-400"
                      : "bg-green-500"
                  } rounded-md inline-block`}
                >
                  {order.status}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersContainer;
