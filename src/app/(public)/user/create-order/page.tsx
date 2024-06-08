"use client";
import {
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import OrderDetails from "./OrderDetails";

const CreateOrderPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.product);
  // if (products?.length === 0) {
  //   return <div>This is a dynamic page, follow proper routes</div>;
  // }
  const handleIncreaseQuantity = (storeId:string, productId:string) => {
    dispatch(increaseQuantity({storeId,productId}));
  };
  const handleDecreaseQuantity = (storeId:string, productId:string) => {
    dispatch(decreaseQuantity({storeId,productId}));
  };
  return (
    <div className="max-w-[1100px] m-auto flex flex-col md:flex-row gap-3 mt-2 text-black dark:text-gray-300">
      <div className="w-full md:w-[60%]">
       
        {Object.keys(products).map((key) => {
          return (
            <div key={key}>
              {products[key].map((product) => {
                return (
                  <div className="flex shadow-lg p-3 bg-white dark:bg-gray-800 mb-2" key={product.id}>
                    <div className="relative h-[100px] md:h-[150px] w-[30%] mr-1">
                    <Image
                    fill
                      
                      src={product.images[0]}
                      alt="product image"
                    />
                    </div>
                    <div>
                      <h2>{product.name}</h2>
                      <div>
                        <Button
                        className="min-w-1 h-auto px-5 py-1 md:px-6"
                          disabled={product.quantity == 1}
                          onClick={() => handleDecreaseQuantity(product.storeId, product.id)}
                        >
                          -
                        </Button>
                        {product.quantity}
                        <Button
                        className="min-w-1 h-auto px-5 py-1 md:px-6"
                          onClick={() => handleIncreaseQuantity(product.storeId, product.id)}
                        >
                          +
                        </Button>
                      </div>
                      <p>{product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-[40%] p-2 bg-white dark:bg-gray-800 mb-2">
        <OrderDetails />
      </div>
    </div>
  );
};

export default CreateOrderPage;
