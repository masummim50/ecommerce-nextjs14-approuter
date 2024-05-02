"use client"
import React, { useState } from "react";
import { SellerOrder } from "../OrdersContainer";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface sellerOrderDetails {
  order: SellerOrder;
  stock: { [key: string]: number };
}

const SellerOrderDetailsContainer = ({
  orderDetails,
}: {
  orderDetails: sellerOrderDetails;
}) => {
    const [stock, setStock] = useState<boolean>(true);
  return (
    <div>
      {/* {JSON.stringify(orderDetails)} */}
      <div className="p-2 flex justify-between items-center shadow-md">
        <div className="info">
          <h2>Payment Status: {orderDetails.order.paymentStatus}</h2>
          <h2>Payment Method: {orderDetails.order.paymentMethod}</h2>
          <h2>Payment Amount: ${orderDetails.order.paymentAmount}</h2>
        </div>
        <div className="status bg-gray-500 text-white px-3 py-1 rounded-md">
          {orderDetails.order.status}
        </div>
      </div>
      <div className="p-2 flex flex-col shadow-md">
        {orderDetails.order.items.map((item) => {
            const haveStock = item.productQuantity <= orderDetails.stock[item.productId];
            
          return (
            <div key={item.productId}
              className={`mb-2 border-b-1 border-b-gray-500 ${
                !haveStock
                  ? "bg-red-200"
                  : ""
              } p-2 rounded-md`}
            >
              <div className={` flex `} key={item.productId}>
                <Image
                  src={item.productImages[0]}
                  width={100}
                  height={100}
                  alt={item.productName}
                />
                <Link href={`/seller/store/edit-product/${item.productId}`} className="truncate grow">{item.productName}</Link>
                <p className="px-4">Qty: {item.productQuantity}</p>
                <p> ${item.productQuantity * item.productPrice}</p>
              </div>
              {!haveStock && (
                <h2>
                  You do not have enough of this product, update stock to
                  confirm this order or cancel
                </h2>
              )}
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button>Accept Order</Button>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetailsContainer;
