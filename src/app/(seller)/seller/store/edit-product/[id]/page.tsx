import { baseUrl } from "@/shared/urls";

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(`${baseUrl}/product/${params.id}`);
  const result = await data.json();
  return <div className="p-2">
    edit product details page {JSON.stringify(result)}
  </div>;
};

export default EditProductPage;
