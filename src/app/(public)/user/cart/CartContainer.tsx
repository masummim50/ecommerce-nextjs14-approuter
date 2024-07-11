"use client";
import { cartItemTypeForCartPage } from "@/app/interfaces/cartItemInterface";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  cn,
} from "@nextui-org/react";

import React, { startTransition, useOptimistic, useState } from "react";
import SelectedItems from "./SelectedItems";
import {
  decreaseQuantityOfCartItemAction,
  increaseQuantityOfCartItemAction,
  removeCartItemAction,
} from "@/actions/userActions";
import { MdDeleteOutline } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CartProductCard from "./CartProductCard";
import Link from "next/link";

const CartContainerCopy = ({
  cartItems,
}: {
  cartItems: { [key: string]: cartItemTypeForCartPage[] };
}) => {
  const [OptimisticCartItems, OptimisticCartItemAction] = useOptimistic<
    { [key: string]: cartItemTypeForCartPage[] },
    { type: string; id: string; storeId: string }
  >(cartItems, (state, { type, id, storeId }) => {
    if (type === "increment") {
      return  {...state, [storeId]: state[storeId].map((s) =>
        s.id === id ? { ...s, quantity: s.quantity + 1 } : s
      )}
    } else if (type === "decrement") {
      return {...state, [storeId]:state[storeId].map((s) =>
        s.id === id ? { ...s, quantity: s.quantity - 1 } : s
      )}
    } else if (type === "delete") {
      return {...state, [storeId]: state[storeId].filter((s) => s.id !== id)}
      
    } else return state;
  });

  const [selected, setSelected] = useState<string[]>([]);

  const [parent] = useAutoAnimate();
  return (
    <div className="flex gap-3">
      <div className="w-[100%] md:w-[60%] flex flex-col gap-2">
        <CheckboxGroup
          label="Select item from your cart"
          color="warning"
          value={selected}
          onValueChange={setSelected}
        >
          <div ref={parent}>
            {Object.entries(OptimisticCartItems).map(([key, value]) => {
              return (
                <div key={key}>
                  <Link href={`/store/${value[0].product.store.id}`} className=" block text-indigo-600 font-semibold">{value[0].product.store.name}</Link>
                  <div className="bg-indigo-500 h-[2px] mb-3 block w-[50%]"></div>
                  {value.map((v) => {
                    return <CartProductCard key={v.id} cartItem={v} OptimisticCartItemAction={OptimisticCartItemAction} />;
                  })}
                </div>
              );
            })}
            {/* {[...OptimisticCartItems]?.map((cartItem) => {
              return (
                <CartProductCard
                  key={cartItem.id}
                  cartItem={cartItem}
                  OptimisticCartItemAction={OptimisticCartItemAction}
                />
              );
            })} */}
          </div>
        </CheckboxGroup>
        {/* {selected.join(" ")} */}
      </div>
      <div className="w-[100%] fixed z-50 md:w-[40%] md:relative bottom-0 left-0  mb-1 p-2 md:p-0 bg-gray-200 dark:bg-gray-800 rounded-md">
        <SelectedItems
          // cartItems={cartItems.filter((items) => selected.includes(items.id))}
          cartItems={Object.values(OptimisticCartItems).flat().filter((items) =>
            selected.includes(items.id)
          )}
        />
      </div>
    </div>
  );
};

export default CartContainerCopy;
