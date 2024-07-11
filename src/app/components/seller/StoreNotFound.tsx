"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createStoreAction } from "@/actions/sellerActions";

interface IFormInput {
  name: string;
  description: string;
}
const StoreNotFound = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [creatingStore, setCreatingStore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    // close the modal
    setCreatingStore(true);
    const result = await createStoreAction(data);
    if(result?.message){
      // error occured
      setCreatingStore(false);
      setErrorMessage(result.message)
      setTimeout(() => {
        setErrorMessage("")
      }, 1000);
    }else{
      onOpenChange();
      setCreatingStore(false);
    }

    // revalidate path /seller/store
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="h-[300px] bg-slate-500 text-white flex flex-col items-center justify-center">
      <p>You dont have a store yet</p>
      <Button onPress={onOpen}>Create Store</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Store
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Store Name is required" }}
                    render={({ field }) => (
                      <Input className="mb-3" label="Store name" {...field} />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Store Description is required" }}
                    render={({ field }) => (
                      <Input className="mb-3" label="description" {...field} />
                    )}
                  />
                  <div className="text-red-500 font-semibold">
                    <p className={`${errorMessage ? 'opacity-100' : 'opacity-0'}`}>{errorMessage}</p>
                  </div>
                  <div className="text-right">
                    <Button isLoading={creatingStore} className="bg-indigo-400" type="submit">
                      {
                        creatingStore ? 'Creating Store...' : 'Create Store'
                      }
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StoreNotFound;
