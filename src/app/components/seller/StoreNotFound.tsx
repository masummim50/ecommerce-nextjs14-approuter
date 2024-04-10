"use client";
import React from "react";
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // close the modal
    createStoreAction(data);
    onOpenChange()
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
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input label="Store name" {...field} />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input label="description" {...field} />
                    )}
                  />

                  <Button type="submit">Create Store</Button>
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

export default StoreNotFound;
