"use client";
import React, { ChangeEvent, SetStateAction, useState } from "react";
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

interface IFormInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[] | null;
}


const CreateProductModal = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name:'',
      description:'',
      price:0,
      stock:0,
      images:null
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadValue, setUploadValue] = useState(0);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if(typeof data.price === 'string'){
      data.price = parseInt(data.price)
    }
    if(typeof data.stock === 'string'){
      data.stock = parseInt(data.stock)
    }
    console.log("onsubmit clicked:", uploadedImages);
    data.images = [...uploadedImages];
    console.log(data);

    const createProductData = await createProductAction(data);
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
          setUploadedImages(prev=> [...prev, data?.data?.display_url])
          console.log("one image uploaded: ", uploadedImages);
        } else {
          console.log("upload failed");
        }
      }
    }
  };

  return (
    <div className="">
      <Button size="sm" color="primary" onPress={onOpen}>
        Add a new product
      </Button>
      <Modal
        placement="center"
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
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
                    rules={{required:true}}
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
                    rules={{required:true}}
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
                        type="file"
                        multiple
                        onChange={(e) => handleImageUpload(e)}
                      />
                    )}
                  />
                  <Progress
                    label={uploadValue === 100 ? "Uploaded" : "Uploading..."}
                    size="sm"
                    value={uploadValue}
                    color="success"
                    showValueLabel={true}
                    className="max-w-md"
                  />

                  <Button
                    color="primary"
                    className="disabled:bg-gray-400"
                    disabled={uploadValue !== 100}
                    type="submit"
                  >
                    Create Store
                  </Button>
                  
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
