import { baseUrl } from "@/shared/urls";
import EditProductForm from "./EditProductForm";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:'Edit product',
  description:''
}

export const dynamic = "force-dynamic";
const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(`${baseUrl}/product/${params.id}`, {
    cache: "no-store",
  });
  const result = await data.json();

  return (
    <div className="p-2 dark:text-gray-300">
      {!result?.data?.id && <p>No such product found</p>}
      {result?.data?.id && <EditProductForm product={result.data} />}
    </div>
  );
};

export default EditProductPage;
