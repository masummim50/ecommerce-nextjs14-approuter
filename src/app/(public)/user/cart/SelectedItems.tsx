"use client";
import { cartItemTypeForCartPage } from "@/app/interfaces/cartItemInterface";
import {
  cartItemType,
  setProduct,
} from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SelectedItems = ({
  cartItems,
}: {
  cartItems: cartItemTypeForCartPage[];
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartProducts: cartItemType[] = [];

  cartItems.forEach((item) => {
    cartProducts.push({ quantity: item.quantity, ...item.product });
  });

  const handleBuyNow = () => {
    dispatch(setProduct(cartProducts));
    router.push("/user/create-order");
  };

  const smallDeviceInformation = cartItems.reduce(
    (prev, curr) => {
      prev["total"] = prev["total"] + curr.quantity;
      prev["totalCost"] =
        prev["totalCost"] + curr.quantity * curr.product.price;
      return prev;
    },
    { total: 0, totalCost: 0 }
  );
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="dark:bg-gray-800 mt-6  rounded-md p-0 md:p-2">
          <h2 className="hidden md:block">Selected Items:</h2>
          {/* small device component */}
          <div className="flex md:hidden justify-between items-center ">
            <p>{smallDeviceInformation.total} items selected</p>
            <p>${smallDeviceInformation.totalCost}</p>
          </div>

          {/* small device end */}
          <div className="hidden md:grid gap-2 grid-cols-1">
            {cartItems.map((c) => {
              return (
                <div
                  className="relative rounded-lg flex shadow-md bg-gray-100 dark:bg-gray-700 p-2"
                  key={c.id}
                >
                  <Image
                    alt="mini image"
                    height={70}
                    width={70}
                    key={c.id}
                    src={c.product.images[0]}
                  />
                  <div>
                    <p>quanity: {c.quantity}</p>
                    <p>cost: {c.quantity * c.product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-right">
            <Button className="mt-2 text-right" onClick={handleBuyNow}>
              Buy now
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-[100px] md:h-[80vh] rounded-md bg-gray-200 justify-center items-center shadow-md dark:bg-gray-800 text-black dark:text-gray-300 mt-6">
          <p>Select some item to Buy them</p>
        </div>
      )}
    </>
  );
};

export default SelectedItems;
