import React from "react";
import Stripe from "stripe";
import CheckoutForm from "./CheckOutForm";
import ScrollToTop from "@/app/ScrollToTop";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const CheckOutPage = async ({ params }: { params: { cost: string } }) => {

  const cost = parseInt(params.cost.replace(".", ""),10);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cost * 100, // use the calculated cost here
    currency: "USD",
  });

  if (paymentIntent.client_secret === null) {
    throw new Error("client secret error: ");
  }

  return (
    <div className="max-w-[1100px] m-auto mt-4 p-4">
      <ScrollToTop/>
      <CheckoutForm secret={paymentIntent.client_secret} />;
    </div>
  );
};

export default CheckOutPage;
