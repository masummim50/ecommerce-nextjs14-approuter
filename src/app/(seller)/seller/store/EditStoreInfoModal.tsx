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
  Textarea,
} from "@nextui-org/react";

import {
  createProductAction,
  createStoreAction,
  updateStoreInformationAction,
} from "@/actions/sellerActions";
import { useFormState, useFormStatus } from "react-dom";
import { revalidatePath } from "next/cache";
import { MdEdit } from "react-icons/md";
import { storeType } from "@/app/interfaces/storeInterface";

interface IFormInput {
  name: string;
  description: string;
}

const EditStoreInfoModal = ({ store }: { store: storeType }) => {

  const [showResponseMessage, setShowResponseMessage] = useState({
    show: false,
    message: "",
  });
  const [pending, setPending] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [myValues, setMyValues] = useState<{
    name: string;
    description: string;
  }>({
    name: store.name,
    description: store.description,
  });

  const submitFunction = async (data: IFormInput) => {
    setPending(true);
    const createProductData = await updateStoreInformationAction(
      store.id,
      data
    );
    setPending(false);
    setShowResponseMessage({ show: true, message: createProductData.message });
    setTimeout(() => {
      setShowResponseMessage({ show: false, message: "" });
    }, 1000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunction(myValues);
  };

  return (
    <div className="m-auto h-auto">
      <Button
        size="sm"
        radius="full"
        className="bg-indigo-600 hover:bg-indigo-700  text-white text-lg m-2"
        onPress={onOpen}
        isIconOnly
      >
        <MdEdit />
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
                Edit Store Info
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
                  <Textarea
                  maxRows={3}
                    value={myValues.description}
                    onChange={(e) =>
                      setMyValues({ ...myValues, description: e.target.value })
                    }
                    name="description"
                    isRequired
                    label="description"
                  />

                  <Button
                    color="primary"
                    className="disabled:bg-gray-400"
                    disabled={pending}
                    type="submit"
                  >
                    {pending ? "Updating..." : "Update"}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditStoreInfoModal;
