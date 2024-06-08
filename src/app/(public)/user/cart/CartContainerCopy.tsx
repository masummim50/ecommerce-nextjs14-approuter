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

const CartContainerCopy = ({
  cartItems,
}: {
  cartItems: cartItemTypeForCartPage[];
}) => {
  const [OptimisticCartItems, OptimisticCartItemAction] = useOptimistic<
    cartItemTypeForCartPage[],
    { type: string; id: string }
  >(cartItems, (state, { type, id }) => {
    if (type === "increment") {
      console.log("type increment running")
      return state.map((s) =>
        s.id === id ? { ...s, quantity: s.quantity + 1 } : s
      );
      
    } else if (type === "decrement") {
      return state.map((s) =>
        s.id === id ? { ...s, quantity: s.quantity - 1 } : s
      );
      
    } else if (type === "delete") {
      const newState = state.filter((s) => s.id !== id);
      return [...newState];
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
            {[...OptimisticCartItems]?.map((cartItem) => {
              return (
                <CartProductCard
                  key={cartItem.id}
                  cartItem={cartItem}
                  OptimisticCartItemAction={OptimisticCartItemAction}
                />
              );
            })}
          </div>
        </CheckboxGroup>
        {/* {selected.join(" ")} */}
      </div>
      <div className="w-[100%] fixed z-50 md:w-[40%] md:relative bottom-0 left-0  mb-1 p-2 md:p-0 bg-gray-200 dark:bg-gray-800 rounded-md">
        <SelectedItems
          // cartItems={cartItems.filter((items) => selected.includes(items.id))}
          cartItems={OptimisticCartItems.filter((items) =>
            selected.includes(items.id)
          )}
        />
      </div>
    </div>
  );
};

export default CartContainerCopy;
