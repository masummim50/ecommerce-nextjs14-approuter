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
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="dark:bg-gray-800 mt-6 p-2 rounded-md">
          <h2>Selected Items:</h2>
          <div className="grid gap-2 grid-cols-1">
            {cartItems.map((c) => {
              return (
                <div className="relative rounded-lg flex shadow-md bg-gray-200 dark:bg-gray-700 p-2" key={c.id}>
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

          <Button className="mt-2" onClick={handleBuyNow}>Buy now</Button>
        </div>
      ) : (
        <div className="flex h-[80vh] rounded-md bg-white justify-center items-center shadow-md dark:bg-gray-800 text-black dark:text-gray-300 mt-6">
          <p>Select some item to Buy them</p>
        </div>
      )}
    </>
  );
};

export default SelectedItems;
