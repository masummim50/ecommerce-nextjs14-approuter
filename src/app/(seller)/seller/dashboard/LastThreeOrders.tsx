import { orderType } from "@/app/interfaces/orderInterface";
import Link from "next/link";
import React from "react";

// pending gray, confirmed blue, shipped teal, delivered green canceled red

function cardColor(status:string){
    switch(status){
        case 'pending':
            return 'bg-gray-300 dark:bg-gray-700';
        case 'confirmed':
            return 'bg-indigo-500';
        case 'shipped':
            return 'bg-teal-500';
        case 'delivered':
            return 'bg-lime-500';
        case 'canceled':
            return 'bg-pink-500'
    }
}

const LastThreeOrders = ({ orders }: { orders: orderType[] }) => {
  return (
    <div>
      <h2 className="dark:text-gray-500 text-gray-800 mt-2">Recent orders:</h2>
      {
        orders.length === 0 ? <div className="h-[200px] rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-300 flex items-center justify-center">No order has been placed yet</div> :
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {orders.map((order: orderType) => {
          return (
            <Link href={`/seller/orders/${order.id}`}
              key={order.id}
              className={` last:col-span-2 md:last:col-span-1 col-span-1 p-3 rounded-md ${cardColor(order.status)} text-white`}
            >
              <p className="line-clamp-1 text-[8px] "> #Order:{order.id}</p>
              <div className="flex justify-between items center">
                <p>
                  {order.items.reduce((prev, curr) => {
                    prev += curr.productQuantity;
                    return prev;
                  }, 0)}{" "}
                  items
                </p>
                <p>${order.paymentAmount}</p>
              </div>
              <div className="rounded-md">{order.status}</div>
            </Link>
          );
        })}
      </div>
}
    </div>
  );
};

export default LastThreeOrders;
