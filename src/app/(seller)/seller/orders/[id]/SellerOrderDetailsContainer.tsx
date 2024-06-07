"use client";
import React, { startTransition, useOptimistic, useState } from "react";
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
  const [optimisticDetails, optimisticStatusUpdate] = useOptimistic(orderDetails, (state, type)=> {
    if(type === 'accept'){
      return {...state, order: {...state.order, status: 'confirmed'}}
    }else if(type === 'cancel'){
      return {...state, order: {...state.order, status: 'canceled'}}
      
    }else if(type === 'ship'){
      return {...state, order: {...state.order, status: 'shipped'}}

    }else return state;
  })
  const [showStockError, setShowStockError] = useState<boolean>(false);
  const [updating, setUpdating] = useState({
    accepting: false,
    shipping: false,
    cancelling: false,
  });

  const handleCancelOrder = async () => {
    setUpdating((prev) => ({ ...prev, cancelling: true }));
    await cancelOrderByIdAction(optimisticDetails.order.id);
    startTransition(()=> {
      optimisticStatusUpdate('cancel')
    })
    setUpdating((prev) => ({ ...prev, cancelling: false }));
  };

  const handleShipOrder = async () => {
    setUpdating((prev) => ({ ...prev, shipping: true }));
    await shipOrderByIdAction(optimisticDetails.order.id);
    startTransition(()=> {
      optimisticStatusUpdate('ship')
    })
    setUpdating((prev) => ({ ...prev, shipping: false }));
  };


  const handleAcceptOrder = async () => {
    console.log("order details: ", optimisticDetails);
    let stockerror = false;
    optimisticDetails.order.items.forEach((item) => {
      if (
        optimisticDetails.stock[item.productId] < item.productQuantity ||
        !optimisticDetails.stock[item.productId]
      ) {
        stockerror = true;
      }
    });
    setShowStockError(stockerror);
    if (!stockerror) {
      setUpdating((prev) => ({ ...prev, accepting: true }));
      await acceptOrderByIdAction(optimisticDetails.order.id);
      startTransition(()=> {
        optimisticStatusUpdate('accept')
      })
      setUpdating((prev) => ({ ...prev, accepting: false }));
    } else {
      setTimeout(() => {
        setShowStockError(false);
      }, 2000);
    }
  };

  const decideButtonRender = (): React.ReactNode => {
    switch (optimisticDetails.order.status) {
      case "pending":
        return (
          <div className="flex justify-end">
            <Button
            isLoading={updating.accepting}
              disabled={updating.accepting}
              color="success"
              onClick={handleAcceptOrder}
            >
              {updating.accepting ? "Accepting" : "Accept Order"}
            </Button>
            <Button
            isLoading={updating.cancelling}
              disabled={updating.cancelling || updating.accepting || updating.shipping}
              color="danger"
              onClick={handleCancelOrder}
            >
              {updating.cancelling ? "Cancelling" : "Cancle Order"}
            </Button>
          </div>
        );
      case "confirmed":
        return (
          <div className="flex justify-end">
            <Button
              isLoading={updating.shipping}
              disabled={updating.shipping}
              color="primary"
              onClick={handleShipOrder}
            >
              {updating.shipping ? "Shipping" : "Mark as Shipped"}
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
      {/* {JSON.stringify(optimisticDetails)} */}
      <div className="p-2 flex justify-between items-center shadow-md dark:bg-gray-800">
        <div className="info">
          <h2>Payment Status: {optimisticDetails.order.paymentStatus}</h2>
          <h2>Payment Method: {optimisticDetails.order.paymentMethod}</h2>
          <h2>Payment Amount: ${optimisticDetails.order.paymentAmount}</h2>
        </div>
        <div className="status bg-gray-500 text-white px-3 py-1 rounded-md">
          {optimisticDetails.order.status}
        </div>
      </div>
      <div className="p-2 flex flex-col shadow-md dark:bg-gray-800 mt-3">
        {optimisticDetails.order.items.map((item) => {
          const haveStock =
            item.productQuantity <= optimisticDetails.stock[item.productId];

          return (
            <div
              key={item.productId}
              className={`mb-2 border-b-1 border-b-gray-500 ${
                !haveStock && optimisticDetails.order.status === "pending"
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
                  href={
                    !haveStock && optimisticDetails.order.status === "pending"
                      ? `/seller/store/edit-product/${item.productId}`
                      : `/seller/store/product/${item.productId}`
                  }
                  className="truncate grow text-indigo-500 font-semibold"
                >
                  {item.productName}
                </Link>
                <div className="flex flex-col md:flex-row">
                  <p className="px-4 text-xs md:text-medium">
                    Qty: {item.productQuantity}
                  </p>
                  <p> ${item.productQuantity * item.productPrice}</p>
                </div>
              </div>
              {!haveStock && optimisticDetails.order.status === "pending" && (
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
