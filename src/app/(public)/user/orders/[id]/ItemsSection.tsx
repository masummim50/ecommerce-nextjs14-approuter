import React from "react";
import { orderDetailsType } from "./OrderInfoDetails";
import Link from "next/link";
import Image from "next/image";

const ItemsSection = ({ details }: { details: orderDetailsType }) => {
  return (
    <div>
      <h2>Items:</h2>
      {details.items.map((item) => {
        return <div key={item.productId} className="p-3 flex flex-col md:flex-row bg-white dark:bg-gray-800">
            <div className="grow flex">
                <Image className="rounded-md" src={item.productImages[0]} height={100} width={100} alt={item.productName}/>
                <p className="line-clamp-1 text-sm">{item.productName}</p>
            </div>
            {
                details.status === 'delivered' && <div className="flex justify-center items-center">
                    <Link className="px-4 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600" href={`/user/orders/review/${item.productId}/${details.id}`}>
                        Write/edit review
                    </Link>
                </div>
            }
        </div>;
      })}
    </div>
  );
};

export default ItemsSection;
