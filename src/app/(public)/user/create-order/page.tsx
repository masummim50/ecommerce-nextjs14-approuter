"use client";
import { decreaseQuantity, increaseQuantity } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import OrderDetails from "./OrderDetails";

const CreateOrderPage = () => {
    const dispatch = useAppDispatch()
  const products = useAppSelector((state: RootState) => state.product.products);
  if (products.length === 0) {
    return <div>This is a dynamic page, follow proper routes</div>;
  }
  const handleIncreaseQuantity = (id:string)=> {
    dispatch(increaseQuantity(id))
  }
  const handleDecreaseQuantity = (id:string)=> {
    dispatch(decreaseQuantity(id))
  }
  return (
    <div className="max-w-[1100px] m-auto flex gap-3">
      <div className="w-[60%]">
        {products.map((product) => {
          return (
            <div className="flex shadow-lg p-3" key={product.id}>
              <Image height={200} width={200} src={product.images[0]} alt="product image" />
              <div>
                <h2>{product.name}</h2>
                <div>
                  <Button disabled={product.quantity == 1} onClick={()=>handleDecreaseQuantity(product.id)}>-</Button>
                  {product.quantity}
                  <Button onClick={()=>handleIncreaseQuantity(product.id)}>+</Button>
                </div>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[40%]">
        <OrderDetails/>
      </div>
    </div>
  );
};

export default CreateOrderPage;
