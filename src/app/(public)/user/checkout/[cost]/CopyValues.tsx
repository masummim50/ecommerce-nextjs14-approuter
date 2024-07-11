"use client";
import React, { useState } from "react";

const CopyValues = () => {
  const [cardCopied, setCardCopied] = useState(false);
  const [expCopied, setExpCopied] = useState(false);
  const [cvcCopied, setCvcCopied] = useState(false);
  const copyCard = () => {
    const number = "4242424242424242";
    navigator.clipboard.writeText(number).then(() => {
      setCardCopied(true);
      setExpCopied(false);
      setCvcCopied(false);
    });
  };
  const copyExp = () => {
    const number = "232";
    navigator.clipboard.writeText(number).then(() => {
      setCardCopied(false);
      setExpCopied(true);
      setCvcCopied(false);
    });
  };
  const copyCvc = () => {
    const number = "435";
    navigator.clipboard.writeText(number).then(() => {
      setCardCopied(false);
      setExpCopied(false);
      setCvcCopied(true);
    });
  };

  return (
    <div className="flex gap-2 mb-2">
      <button
        className={`px-2 py-1 ${
          cardCopied ? "bg-green-300 text-black" : "bg-gray-300 dark:bg-gray-800 text-black dark:text-white"
        } rounded-md text-xs sm:text-medium`}
        onClick={copyCard}
      >
        copy card Number
      </button>
      <button
        className={`px-2 py-1 ${
            expCopied ? "bg-green-300 text-black" : "bg-gray-300 dark:bg-gray-800 text-black dark:text-white"
          } rounded-md text-xs sm:text-medium`}
        onClick={copyExp}
      >
        copy exp date
      </button>
      <button
        className={`px-2 py-1 ${
            cvcCopied ? "bg-green-300 text-black" : "bg-gray-300 dark:bg-gray-800 text-black dark:text-white"
          } rounded-md text-xs sm:text-medium`}
        onClick={copyCvc}
      >
        copy cvc
      </button>
    </div>
  );
};

export default CopyValues;
