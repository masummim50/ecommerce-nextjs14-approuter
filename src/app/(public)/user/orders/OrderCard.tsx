import { orderType } from "@/app/interfaces/orderInterface";
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import React from "react";

const OrderCard = ({ order }: { order: orderType }) => {
  const quantity = order.items.reduce((prev, curr) => {
    prev += curr.productQuantity;
    return prev;
  }, 0);
  return (
    <div className="shadow-md mb-2 rounded-sm overflow-hidden">
      <div className="border-b-[1px] border-gray-200">
        <h2>
          Order{" "}
          <Link className="text-sky-600" href={`/user/orders/${order.id}`}>
            {order.id}
          </Link>
        </h2>
        <p>Placed on: {formatDate(order.createdAt, false)}</p>
      </div>
      <div className="px-2">
        {order.items.map((item) => {
          return (
            <div
              key={item.productId}
              className="grid grid-cols-7 gap-1 mb-2 p-2"
            >
              <div className="col-span-3 flex">
                <div className="w-[80px] h-[80px] relative rounded-md overflow-hidden">
                  <img
                    className="h-full w-full"
                    src={item.productImages[0]}
                    alt=""
                  />
                  <div className="absolute top-0 left-0 z-20 h-full w-full bg-gray-900/50 text-white flex items-center justify-center">
                    {item.productQuantity}items
                  </div>
                </div>
                <h2>{item.productName}</h2>
              </div>
              <div>Qty:{item.productQuantity}</div>

              <div>

              <div className={`${order.status === 'pending' ? 'bg-gray-400' : order.status === 'confirmed' ? 'bg-orange-300' : order.status === 'shipped' ? 'bg-sky-400': 'bg-green-500'} text-white rounded-lg px-3 py-0 inline-block`}>{order.status}</div>
              </div>

              <div className="col-span-2 text-right">
                {order.status === "pending"
                  ? `Order Placed on: ${formatDate(order.createdAt)}`
                  : order.status === "confirmed"
                  ? `Order Confirmed on: ${formatDate(order.updatedAt)}`
                  : order.status === "shipped"
                  ? ` Shipped on: ${formatDate(order.updatedAt)}`
                  : `Delivered on: ${formatDate(order.updatedAt)}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;

{
  /* <div className="grid grid-cols-7 gap-1 shadow-md mb-2">
            <div className="col-span-3">

            <div className="w-[100px] h-[100px] relative rounded-md overflow-hidden">
                <img className="h-full w-full" src={order.items[0].productImages[0]} alt="" />
                <div className="absolute top-0 left-0 z-20 h-full w-full bg-gray-900/50 text-white flex items-center justify-center">
                    {quantity}items
                </div>
            </div>
            </div>
            <div>
                quantity
            </div>
            <div>
                status
            </div>
            <div className="col-span-2 text-right">
                date
            </div>
        </div>  */
}
