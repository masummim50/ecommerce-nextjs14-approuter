"use client"

import React from 'react';
import { orderReceivedAction } from "@/actions/userActions";

import { Button } from "@nextui-org/button";

const MarkAsReceivedButton = ({id}:{id:string}) => {
    const handleProductReceived = async()=> {
        await orderReceivedAction(id);
      }
    return (
        
        <Button onClick={handleProductReceived}>I received the Package</Button>
    );
};

export default MarkAsReceivedButton;
