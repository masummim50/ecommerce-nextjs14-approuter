"use client"
import React, { useState } from "react";

import Toast from "./Toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";




const ToastContainer = () => {
const toasts = useAppSelector((state:RootState)=> state.toasts);
const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className="fixed flex flex-col-reverse justify-start w-full h-[100vh]  pointer-events-none  top-0 left-0 z-[100]">
      {toasts.map((toast) => (
        <Toast text={toast.text} key={toast.id} />
      ))}
    </div>
  );
};

export default ToastContainer;
