"use client";
import React, { useState } from "react";
import { SellerOrder } from "../OrdersContainer";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  acceptOrderByIdAction,
  cancelOrderByIdAction,
  shipOrderByIdAction,
} from "@/actions/sellerActions";

interface sellerOrderDetails {
  order: SellerOrder;
  stock: { [key: string]: number };
}

const SellerOrderDetailsContainer = ({
  orderDetails,
}: {
  orderDetails: sellerOrderDetails;
}) => {
  const [showStockError, setShowStockError] = useState<boolean>(false);

  const handleCancelOrder = async () => {
    await cancelOrderByIdAction(orderDetails.order.id);
  };
  const handleShipOrder = async () => {
    await shipOrderByIdAction(orderDetails.order.id);
  };
  const handleAcceptOrder = async () => {
    console.log("order details: ", orderDetails);
    let stockerror = false;
    orderDetails.order.items.forEach((item) => {
      if (
        orderDetails.stock[item.productId] < item.productQuantity ||
        !orderDetails.stock[item.productId]
      ) {
        stockerror = true;
      }
    });
    setShowStockError(stockerror);
    if (!stockerror) {
      await acceptOrderByIdAction(orderDetails.order.id);
    } else {
      setTimeout(() => {
        setShowStockError(false);
      }, 2000);
    }
  };

  const decideButtonRender = (): React.ReactNode => {
    switch (orderDetails.order.status) {
      case "pending":
        return (
          <div className="flex justify-end">
            <Button color="success" onClick={handleAcceptOrder}>
              Accept Order
            </Button>
            <Button color="danger" onClick={handleCancelOrder}>
              Cancle Order
            </Button>
          </div>
        );
      case "confirmed":
        return (
          <div className="flex justify-end">
            <Button color="primary" onClick={handleShipOrder}>
              Mark as Shipped
            </Button>
          </div>
        );
      case "shipped":
        return (
          <div className="flex justify-end">
            <Button color="warning">Shipped</Button>
          </div>
        );
      case "delivered":
        return (
          <div className="flex justify-end">
            <Button color="success">Delivered</Button>
          </div>
        );
    }
  };
  return (
    <div>
      {/* {JSON.stringify(orderDetails)} */}
      <div className="p-2 flex justify-between items-center shadow-md dark:bg-gray-800">
        <div className="info">
          <h2>Payment Status: {orderDetails.order.paymentStatus}</h2>
          <h2>Payment Method: {orderDetails.order.paymentMethod}</h2>
          <h2>Payment Amount: ${orderDetails.order.paymentAmount}</h2>
        </div>
        <div className="status bg-gray-500 text-white px-3 py-1 rounded-md">
          {orderDetails.order.status}
        </div>
      </div>
      <div className="p-2 flex flex-col shadow-md dark:bg-gray-800 mt-3">
        {orderDetails.order.items.map((item) => {
          const haveStock =
            item.productQuantity <= orderDetails.stock[item.productId];

          return (
            <div
              key={item.productId}
              className={`mb-2 border-b-1 border-b-gray-500 ${
                !haveStock && orderDetails.order.status === "pending"
                  ? "bg-red-100 dark:bg-gray-800"
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
                <Link
                  href={`/seller/store/edit-product/${item.productId}`}
                  className="truncate grow"
                >
                  {item.productName}
                </Link>
                <p className="px-4">Qty: {item.productQuantity}</p>
                <p> ${item.productQuantity * item.productPrice}</p>
              </div>
              {!haveStock && orderDetails.order.status === "pending" && (
                <h2 className="text-red-500 ">
                  You do not have enough of this product, update stock to
                  confirm this order or cancel
                </h2>
              )}
            </div>
          );
        })}
        {
          <div
            className={`flex justify-end ${
              showStockError ? "opacity-1" : "opacity-0"
            }`}
          >
            <p className="text-red-600">
              You need to re-stock some of these product before accepting this
              order
            </p>
          </div>
        }
        {decideButtonRender()}
      </div>
    </div>
  );
};

export default SellerOrderDetailsContainer;
