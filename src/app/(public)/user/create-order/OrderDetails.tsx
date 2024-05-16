"use client";
import { useAppSelector } from "@/redux/hooks";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import { RootState } from '@/redux/store';
import { productType } from "@/app/interfaces/productInterface";
import { cartItemType } from "@/redux/features/product/productSlice";
import { createOrderAction } from "@/actions/userActions";

type stateType = {
  [key:string]: cartItemType[]
}

const calculateMoneyDetails = (param:stateType)=> {
    let items = 0;
    let cost = 0;
    let deliveryCharge = 0;
    for(const [key, value] of Object.entries(param)){
      deliveryCharge+=50;
      value.forEach((product)=> {
        items+= product.quantity;
        cost = cost +(product.price * product.quantity)
      })
    }
    
    return {items,cost, deliveryCharge};
}

const OrderDetails = () => {
    const products = useAppSelector((state:RootState)=> state.product);
    const {cost, items,deliveryCharge} = calculateMoneyDetails(products);
  const [paymentType, setPaymentType] = useState("later");

  const handlePlaceOrder = async()=> {
    // find the array of objects to create order

    await createOrderAction(products)
  }
  return (
    <div className="shadow-lg">
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
        <p>{cost+deliveryCharge}</p>
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
        {paymentType === "now" && <Button fullWidth>Checkout</Button>}
        {paymentType === "later" && <Button onClick={handlePlaceOrder} fullWidth>Place Order</Button>}
      </div>
    </div>
  );
};

export default OrderDetails;
