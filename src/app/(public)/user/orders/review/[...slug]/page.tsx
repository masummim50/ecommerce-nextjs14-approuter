import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import React from "react";
import ReviewForm from "./ReviewForm";

import { Metadata } from "next";
import ScrollToTop from "@/app/ScrollToTop";

export const metadata:Metadata = {
  title:'Write Review',
  description:''
}

const WriteReviewPage = async ({ params }: { params: { slug: string[] } }) => {
  const productId = params.slug[0];
  const orderId = params.slug[1];
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const result = await fetch(`${baseUrl}/review/${productId}/${orderId}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-[100vh] pt-5">
      <ScrollToTop/>
      <div className="mx-auto max-w-[1100px] ">
        <ReviewForm data={data.data} productId={productId} orderId={orderId} />
      </div>
    </div>
  );
};

export default WriteReviewPage;
