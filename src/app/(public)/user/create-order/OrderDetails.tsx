"use client";
import { useAppSelector } from "@/redux/hooks";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { productType } from "@/app/interfaces/productInterface";
import { cartItemType } from "@/redux/features/product/productSlice";
import { createOrderAction } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type stateType = {
  [key: string]: cartItemType[];
};

export const calculateMoneyDetails = (param: stateType) => {
  let items = 0;
  let cost = 0;
  let deliveryCharge = 0;
  for (const [key, value] of Object.entries(param)) {
    deliveryCharge += 50;
    value.forEach((product) => {
      items += product.quantity;
      cost =
        cost +
        (product.price - (product.price * product.discount) / 100) *
          product.quantity;
    });
  }
  cost = parseFloat(cost.toFixed(2));
  return { items, cost, deliveryCharge };
};

const OrderDetails = () => {
  const router = useRouter();
  const products = useAppSelector((state: RootState) => state.product);
  const { cost, items, deliveryCharge } = calculateMoneyDetails(products);
  const [paymentType, setPaymentType] = useState("later");

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckOutClick = ()=> {
    router.push(`/user/checkout/${cost}`)
  }
  const handlePlaceOrder = async (paymentMethod: string) => {
    // find the array of objects to create order
    setPlacingOrder(true);
    await createOrderAction(products, paymentMethod);
    setOrderPlaced(true);
    setPlacingOrder(false);
    setTimeout(() => {
      router.push("/user/orders");
    }, 2000);
  };
  return (
    <div className="shadow-lg">
      <div
        className={`absolute h-[100vh] bg-black/10 backdrop-blur-sm top-0 left-0 w-full z-[200] ${
          orderPlaced ? "flex opacity-100" : "hidden opacity-0"
        } transition-opacity duration-1000 justify-center items-center`}
      >
        <div className="rounded-md bg-white dark:bg-gray-800 p-2">
          <p className="text-green-500 font-bold">Order placed successfully</p>
        </div>
      </div>
      <h2>Order Details:</h2>
      <div className="flex justify-between items-center">
        <p>Total Items: </p>
        <p>{items}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Total cost: </p>
        <p>{cost}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Delivery charge: </p>
        <p>{deliveryCharge}</p>
      </div>
      <div className="border-b-3"></div>
      <div className="flex justify-between items-center">
        <p>Total: </p>
        <p>{(cost + deliveryCharge).toFixed(2)}</p>
      </div>

      <div className="flex">
        <RadioGroup
          label="select payment method"
          orientation="horizontal"
          defaultValue={paymentType}
          color="success"
        >
          <Radio onChange={() => setPaymentType("now")} value="now">
            Pay now
          </Radio>
          <Radio onChange={() => setPaymentType("later")} value="later">
            Cash on Delivery
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex">
        {/* <Button fullWidth>Checkout</Button> */}
        {paymentType === "now" && (
          <Button onClick={handleCheckOutClick} >
            checkout now
          </Button>
        )}
        {paymentType === "later" && (
          <Button
            isLoading={placingOrder}
            onClick={() => handlePlaceOrder("cash")}
            fullWidth
          >
            {" "}
            {placingOrder ? "Ordering" : "Place Order"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
