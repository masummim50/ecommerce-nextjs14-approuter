"use client";

import { ErrorMessage } from "@hookform/error-message";
import { updateProductAction } from "@/actions/sellerActions";
import { productType } from "@/app/interfaces/productInterface";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface submitUpdateType {
  id: string;
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  discount: number | string;
  images: string[];
  category: string;
}

export default function EditProductForm({ product }: { product: productType }) {
  const [updating, setUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    defaultValues: {
      ...product,
      stock: product.stock.toString(),
      price: product.price.toString(),
      discount: product.discount.toString(),
    },
  });
  const router = useRouter();

  const [showUpdateSuccess,setShowUpdateSuccess] = useState(false);

  const onSubmit = async (data: Partial<submitUpdateType>) => {
    setUpdating(true);
    const dataToSend: Partial<productType> = {};
    for (const [key, value] of Object.entries(dirtyFields)) {
      if (key === "price" || key === "stock" || key === "discount") {
        if (key === "stock") {
          (dataToSend as any)[key] = parseInt((data as any)[key]);
        } else {
          (dataToSend as any)[key] = parseFloat((data as any)[key]);
        }
      } else {
        (dataToSend as any)[key] = (data as any)[key];
      }
    }
    await updateProductAction(product.id, dataToSend);
    setShowUpdateSuccess(true);
    setUpdating(false);
    setTimeout(() => {
      router.push(`/seller/store/product/${product.id}`)
    }, 1000);
  };

  function textAreaSize(): number {
    if (window) {
      const { innerWidth: width } = window;
      if (width > 768) {
        return 8;
      } else {
        return 4;
      }
    } else {
      return 8;
    }
  }
  const [textAreaRow, setTextAreaRow] = useState(textAreaSize());

  useEffect(() => {
    function handleResize() {
      setTextAreaRow(textAreaSize);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={`absolute bg-black/20 backdrop-blur-sm h-[100vh] z-[200] top-0 left-0 ${showUpdateSuccess ? "flex": "hidden"} justify-center items-center w-full`}>
        <div className="rounded-md p-5 bg-white dark:bg-gray-600  text-green-500 font-semibold">
          <p>Update successful</p>
        </div>
      </div>
      <h2>Edit product Information:</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-0 md:gap-2">
          <div className="flex flex-col grow">
            <label htmlFor="name">Name</label>
            <input
              disabled={updating}
              required
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400"
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            />
            <label htmlFor="description">Description</label>
            <textarea
              disabled={updating}
              placeholder="Description"
              rows={textAreaRow}
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400 "
              {...register("description", { required: true })}
            />
          </div>
          <div className="flex flex-col grow">
            <label htmlFor="price">Price</label>
            <input
              disabled={updating}
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400"
              type="number"
              step="0.01"
              placeholder="price"
              {...register("price", { required: true, min: 1 })}
            />
            <label htmlFor="stock">Stock</label>
            <input
              disabled={updating}
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400"
              type="number"
              placeholder="stock"
              {...register("stock", { required: true })}
            />
            <label htmlFor="discount">Discount</label>
            <input
              disabled={updating}
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400"
              type="number"
              step="0.01"
              placeholder="discount"
              {...register("discount", {
                required: { value: true, message: "this field is required" },
                min: {value: 0, message: "The minimum value is 0"},
                max: {value: 99, message: "The maximum value is 99"},
                validate: value=> (parseFloat(value) >= 0 && parseFloat(value) <= 99) || "Value must be between 0 and 99"
              })}
            />
            <ErrorMessage
              errors={errors}
              name="discount"
              render={({ message }) => <p>{message}</p>}
            />
            <label htmlFor="category">Category</label>
            <input
              disabled={updating}
              className="max-w-[600px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:focus:border-gray-400 outline-none border-2 border-gray-200 rounded-md mb-2 p-3 focus:border-gray-400"
              type="text"
              placeholder="category"
              {...register("category", { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
          isLoading={updating}
            disabled={updating || !isDirty}
            className={`px-8 ${
              isDirty ? "bg-indigo-500 text-white hover:bg-indigo-600" : ""
            } `}
            type="submit"
          >
            {updating ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
