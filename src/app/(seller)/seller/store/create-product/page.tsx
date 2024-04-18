"use client";
import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Progress,
} from "@nextui-org/react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  createProductAction,
  createStoreAction,
} from "@/actions/sellerActions";
import { useFormState, useFormStatus } from "react-dom";

import { revalidatePath } from "next/cache";

interface IFormInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[] | undefined;
}

const CreateProductPage = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      images: undefined,
    },
  });

  const [showResponseMessage, setShowResponseMessage] = useState({
    show: false,
    message: "",
  });
  const imageref = useRef<HTMLInputElement | null>(null);
  const [pending, setPending] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadValue, setUploadValue] = useState(-1);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setPending(true);
    if (typeof data.price === "string") {
      data.price = parseInt(data.price);
    }
    if (typeof data.stock === "string") {
      data.stock = parseInt(data.stock);
    }
    console.log("onsubmit clicked:", uploadedImages);
    data.images = [...uploadedImages];
    console.log(data);

    const createProductData = await createProductAction(data);
    reset();
    if (imageref.current && imageref.current.value) {
      imageref.current.value = "";
    }
    setPending(false);
    setUploadedImages([]);
    setUploadValue(-1);
    setShowResponseMessage({ show: true, message: createProductData.message });
    setTimeout(() => {
      setShowResponseMessage({ show: false, message: "" });
    }, 1000);
    console.log("create product data action ended: ", createProductData);

  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadedImages([]);
    const images = e.target.files;
    console.log("image upload selected: ", images);
    setUploadValue(0);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const imageData = new FormData();
        imageData.set("key", "e714769a5c6946f2db13d49ca7ee48b3");
        imageData.set("image", images[i]);
        const upload = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: imageData,
        });
        if (upload.ok) {
          setUploadValue(100 / (images.length - i));
          const data = await upload.json();
          console.log("upload: ", data);
          setUploadedImages((prev) => [...prev, data?.data?.display_url]);
          console.log("one image uploaded: ", uploadedImages);
        } else {
          console.log("upload failed");
        }
      }
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input defaultValue="" isRequired label="Product name" {...field} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input isRequired label="description" {...field} />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isRequired
              min={1}
              label="price"
              type="number"
              step={1}
              value={field.value as any}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="stock"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              min={1}
              label="stock"
              type="number"
              step={1}
              value={field.value as any}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              ref={imageref}
              type="file"
              multiple
              onChange={(e) => {
                handleImageUpload(e);
              }}
            />
          )}
        />
        {uploadValue !== -1 && (
          <Progress
            label={uploadValue === 100 ? "Uploaded" : "Uploading..."}
            size="sm"
            value={uploadValue}
            color="success"
            showValueLabel={true}
            className="max-w-md"
          />
        )}

        <Button
          color="primary"
          className="disabled:bg-gray-400"
          disabled={uploadValue !== 100 || pending}
          type="submit"
        >
          {pending ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
