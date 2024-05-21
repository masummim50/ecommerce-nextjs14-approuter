import { baseUrl } from "@/shared/urls";
import EditProductForm from "./EditProductForm";

export const dynamic = 'force-dynamic'

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(`${baseUrl}/product/${params.id}`);
  const result = await data.json();
  console.log("edit product: ", result)
  
  return <div className="p-2 dark:text-gray-300">
    {
      !result?.data?.id  && <p>No such product found</p>
    }
    {
      result?.data?.id && <EditProductForm product={result.data}/>
    }
  </div>;
};

export default EditProductPage;
