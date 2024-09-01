"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@nextui-org/react";
import { createOrderAction } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import DynamicLoading from "@/app/components/shared/DynamicLoading";
import CopyValues from "./CopyValues";
import { isEmptyObject } from "@/helpers/checkEmptyObject";

const clientStripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string
);



export default function CheckoutForm({ secret }: { secret: string }) {
  const router = useRouter();
  const products = useAppSelector((state: RootState) => state.product);
  const isEmpty = isEmptyObject(products);

  useEffect(() => {
    if (isEmpty) {
      router.push("/user/cart");
    }
  }, [isEmpty,router]);

  return (
    <>
      {isEmpty ? (
        <DynamicLoading text="Processing..." />
      ) : (
        <>
          {secret ? (
            <>
              <CopyValues />
              <Elements
                options={{ clientSecret: secret }}
                stripe={clientStripe}
              >
                <Form products={products} />
              </Elements>
            </>
          ) : (
            <p>loading...</p>
          )}
        </>
      )}
    </>
  );
}

function Form({ products }: { products: any }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe === null || elements === null) return;
    // create order in the data base and check if the id is properly there.
    setLoading(true);
    const orders = await createOrderAction(products, "card");

    if (orders.data?.length < 1) return;

    stripe
      ?.confirmPayment({
        elements,
        
        confirmParams: {
          return_url: "https://best-buy-nu.vercel.app/user/stripe/success",
        },
      })
      .then((value) => {
        console.log("order -- ");
      })
      .catch((error) =>
        setError(error?.message ? error.message : "something went wrong")
      )
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div>{error}</div>
      <PaymentElement />
      <Button
        disabled={elements == null || stripe == null || loading}
        fullWidth
        className={``}
        type="submit"
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
}
