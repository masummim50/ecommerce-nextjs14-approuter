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
import { headers } from "next/headers";
import Image from "next/image";
import React, { startTransition, useOptimistic, useState } from "react";
import SelectedItems from "./SelectedItems";
import { decreaseQuantityOfCartItemAction, increaseQuantityOfCartItemAction } from "@/actions/userActions";

const CartContainer = ({
  cartItems,
}: {
  cartItems: cartItemTypeForCartPage[];
}) => {
  const [OptimisticCartItems, OptimisticCartItemAction] = useOptimistic<
    cartItemTypeForCartPage[],
    { type: string; id: string }
  >(cartItems, (state, { type, id }) => {
    if(type==='increment'){

      state.forEach((s) => {
        if (s.id === id) {
          s.quantity = s.quantity+1;
        }
      });
      return [...state];
    }
    if(type==='decrement'){
      state.forEach((s) => {
        if (s.id === id) {
          s.quantity = s.quantity-1;
        }
      });
      return [...state];

    }
    
    return [...state]
  });

  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex gap-3">
      <div className="w-[60%] flex flex-col gap-2">
        <CheckboxGroup
          label="Select item from your cart"
          color="warning"
          value={selected}
          onValueChange={setSelected}
          
        >
          {[...OptimisticCartItems]?.map((cartItem) => {
            return (
              <div className="w-full mb-2" key={cartItem.id}>
                <Checkbox
                  color="primary"
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-[100%] bg-white dark:bg-gray-800 mb-1 shadow-md justify-start",
                      // "hover:bg-content2 ",
                      "cursor-pointer rounded-lg gap-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                  }}
                  key={cartItem.id}
                  value={cartItem.id}
                >
                  <div className="flex w-[100%]">
                    <Image
                      src={cartItem.product.images[0]}
                      height={100}
                      width={100}
                      alt={"cart item"}
                    />
                    <div className="grow flex flex-col">
                      <div className="info">
                        <h2>{cartItem.product.name}</h2>
                        <p>Sold by: {cartItem.product.store.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <div className="price">${cartItem.product.price}</div>
                        <div className="quantity">
                          <ButtonGroup>
                            <Button onClick={async () => {
                                startTransition(() => {
                                  OptimisticCartItemAction({
                                    type: "decrement",
                                    id: cartItem.id,
                                  });
                                });
                                await decreaseQuantityOfCartItemAction(cartItem.id)
                              }} size="sm">-</Button>
                            <Button color="primary" disabled size="sm">
                              {cartItem.quantity}
                            </Button>

                            <Button
                              onClick={async () => {
                                startTransition(() => {
                                  OptimisticCartItemAction({
                                    type: "increment",
                                    id: cartItem.id,
                                  });
                                });
                                await increaseQuantityOfCartItemAction(cartItem.id)
                              }}
                              size="sm"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </Checkbox>
              </div>
            );
          })}
        </CheckboxGroup>
        {/* {selected.join(" ")} */}
      </div>
      <div className="w-[40%]">
        <SelectedItems
          cartItems={cartItems.filter((items) => selected.includes(items.id))}
        />
      </div>
    </div>
  );
};

export default CartContainer;
