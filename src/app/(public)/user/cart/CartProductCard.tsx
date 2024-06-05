import { decreaseQuantityOfCartItemAction, increaseQuantityOfCartItemAction, removeCartItemAction } from '@/actions/userActions';
import { Button, ButtonGroup, Checkbox, cn } from '@nextui-org/react';
import Image from 'next/image';
import React, { startTransition } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { cartItemTypeForCartPage } from '@/app/interfaces/cartItemInterface';

const CartProductCard = ({cartItem,OptimisticCartItemAction}:{cartItem:cartItemTypeForCartPage,OptimisticCartItemAction:any}) => {
    return (
        <div className="w-full mb-2 relative" key={cartItem.id}>
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
                  <div
                    onClick={async (e) => {
                      e?.preventDefault();
                      startTransition(() => {
                        OptimisticCartItemAction({
                          type: "delete",
                          id: cartItem.id,
                        });
                      });
                      // change this
                      await removeCartItemAction(
                        cartItem.id
                      );
                    }}
                    className="absolute top-0 right-0 text-red-600 z-40 p-2 border rounded-full bg-red-100 hover:bg-red-200"
                  >
                    <MdDeleteOutline />
                  </div>
                  <div className="flex w-[100%]">
                    <Image
                      src={cartItem.product.images[0]}
                      height={100}
                      width={100}
                      alt={"cart item"}
                    />
                    <div className="grow flex flex-col">
                      <div className="info">
                        <h2 className="text-sm md:text-medium w-[80%] line-clamp-1">
                          {cartItem.product.name}
                        </h2>
                        <p className="text-xs md:text-sm">
                          Sold by: {cartItem.product.store.name}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div className="price">${cartItem.product.price}</div>
                        <div className="quantity">
                          <ButtonGroup>
                            <Button
                              size="sm"
                              disabled={cartItem.quantity < 2}
                              className="h-auto min-w-1 px-3 py-1 md:px-4 md:py-1"
                              onClick={async () => {
                                startTransition(() => {
                                  OptimisticCartItemAction({
                                    type: "decrement",
                                    id: cartItem.id,
                                  });
                                });
                                await decreaseQuantityOfCartItemAction(
                                  cartItem.id
                                );
                              }}
                            >
                              -
                            </Button>
                            <Button
                              className="h-auto min-w-1 px-3 py-1 md:px-4 md:py-1"
                              color="primary"
                              disabled
                              size="sm"
                            >
                              {cartItem.quantity}
                            </Button>

                            <Button
                              className="h-auto min-w-1 px-3 py-1 md:px-4 md:py-1"
                              onClick={async () => {
                                startTransition(() => {
                                  OptimisticCartItemAction({
                                    type: "increment",
                                    id: cartItem.id,
                                  });
                                });
                                await increaseQuantityOfCartItemAction(
                                  cartItem.id
                                );
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
};

export default CartProductCard;