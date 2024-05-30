"use client";
import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
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

import {
  createProductAction,
  createStoreAction,
} from "@/actions/sellerActions";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";
import { revalidatePath } from "next/cache";
import { getRandomData } from "./data";

interface IFormInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[] | undefined;
}

const CreateProductModal = () => {
  const [showResponseMessage, setShowResponseMessage] = useState({
    show: false,
    message: "",
  });
  const imageref = useRef<HTMLInputElement | null>(null);
  const [pending, setPending] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadValue, setUploadValue] = useState(-1);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const submitFunction = async (data: IFormInput) => {
    setPending(true);
    if (typeof data.price === "string") {
      data.price = parseInt(data.price);
    }
    if (typeof data.stock === "string") {
      data.stock = parseInt(data.stock);
    }

    const createProductData = await createProductAction(data);
    setMyValues({
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      images: [],
    });
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
  };

  const [myValues, setMyValues] = useState<{
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
  }>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: [],
  });
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    // clear generated images field
    setMyValues((prev) => {
      return { ...prev, images: [] };
    });
    setUploadedImages([]);
    const images = e.target.files;
    setUploadValue(0);
    const myimages = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const imageData = new FormData();
        // imageData.set("key", "e714769a5c6946f2db13d49ca7ee48b3");
        imageData.set("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY as string);
        imageData.set("image", images[i]);
        const upload = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: imageData,
        });
        if (upload.ok) {
          setUploadValue(100 / (images.length - i));
          const data = await upload.json();
          await setUploadedImages((prev) => [...prev, data?.data?.display_url]);
          // setMyValues({
          //   ...myValues,
          //   images: [...myValues.images, data?.data?.display_url],
          // });
          setMyValues((prev) => {
            return {
              ...prev,
              images: [...prev.images, data?.data?.display_url],
            };
          });
          myimages.push(data?.data?.display_url);
        } else {
          console.log("upload failed: ", upload);
        }
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunction(myValues);
  };

  const generateValues = () => {
    const data = getRandomData();
    setUploadValue(100);
    setMyValues({
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      stock: data.stock,
      images: data.images,
    });
  };
  return (
    <div className="m-auto h-auto">
      <Button
        size="sm"
        className="bg-indigo-500 hover:bg-indigo-600 mt-2 text-white"
        onPress={onOpen}
      >
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
                Create Product
                <Button size="sm" onClick={generateValues}>
                  Add a random product
                </Button>
                <div>{showResponseMessage.show && "response"}</div>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Input
                    value={myValues.name}
                    onChange={(e) =>
                      setMyValues({ ...myValues, name: e.target.value })
                    }
                    name="name"
                    isRequired
                    label="Product name"
                  />
                  <Input
                    value={myValues.description}
                    onChange={(e) =>
                      setMyValues({ ...myValues, description: e.target.value })
                    }
                    name="description"
                    isRequired
                    label="description"
                  />
                  <Input
                    value={myValues.category}
                    onChange={(e) =>
                      setMyValues({ ...myValues, category: e.target.value })
                    }
                    name="category"
                    isRequired
                    label="category"
                  />

                  <Input
                    value={myValues.price as any}
                    onChange={(e) =>
                      setMyValues({
                        ...myValues,
                        price: parseFloat(e.target.value),
                      })
                    }
                    isRequired
                    min={1}
                    label="price"
                    type="number"
                    step={1}
                    name="price"
                  />
                  <Input
                    value={myValues.stock as any}
                    onChange={(e) =>
                      setMyValues({
                        ...myValues,
                        stock: parseInt(e.target.value),
                      })
                    }
                    isRequired
                    min={1}
                    label="stock"
                    type="number"
                    step={1}
                    name="stock"
                  />
                  <input
                    ref={imageref}
                    type="file"
                    multiple
                    onChange={(e) => {
                      handleImageUpload(e);
                    }}
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
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
