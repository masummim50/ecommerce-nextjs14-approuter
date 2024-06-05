"use client";

import React, { startTransition, useState } from "react";
import { orderReceivedAction } from "@/actions/userActions";

import { Button } from "@nextui-org/button";

const MarkAsReceivedButton = ({ id,optimisticUpdate }: { id: string , optimisticUpdate:any}) => {
  const [receiving, setReceiving] = useState(false);
  const handleProductReceived = async () => {
    
    setReceiving(true)
    await orderReceivedAction(id);
    
    setReceiving(false);
    startTransition(() => {
      optimisticUpdate()
    });
  };
  return (
    <Button isLoading={receiving} onClick={handleProductReceived}>{receiving ? 'Processing' : 'I received the Package'}</Button>
  );
};

export default MarkAsReceivedButton;
