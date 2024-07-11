import { baseUrl } from "@/shared/urls";
import React from "react";
import SellerProductDetails from "./SellerProductDetails";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:'Porduct Details',
  description:''
}

export const dynamic = 'force-dynamic'

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const result = await fetch(`${baseUrl}/product/forseller/${params.id}`);
  const data = await result.json();

  return (
    <div className="p-2 text-black dark:text-gray-400 bg-gray-200 dark:bg-gray-900">
      {data?.data?.id ? (
        <SellerProductDetails product={data?.data} />
      ) : (
        <div>didnt find anything </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
