import Link from "next/link";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const StripeSuccessPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = searchParams.payment_intent;
  const result = await stripe.paymentIntents.retrieve(paymentIntent);


  return (
    <div className="max-w-[1100px] shadow-lg m-auto mt-4 bg-gray-200 rounded-md border dark:bg-gray-800  h-[300px] flex justify-center items-center">
      {result.status === "succeeded" ? (
        <div className="flex flex-col">
        <p className="text-green-600 font-semibold text-lg block">
          Payment Successfull
        </p>
        <div>

        <Link className="p-4 font-semibold block underline" href={'/user/orders'}>Check your orders</Link>
        </div>
        </div>
      ) : (
        "Ooops, something went wrong"
      )}
    </div>
  );
};

export default StripeSuccessPage;
