"use client";
import React, { useEffect, useState } from "react";

const Toast = ({text}:{text:string}) => {
  return (
    <div
      className={` bg-green-300 max-w-[300px] w-full rounded-md px-4 py-2 mb-1 ml-2`}
    >
      {text}
    </div>
  );
};

export default Toast;
