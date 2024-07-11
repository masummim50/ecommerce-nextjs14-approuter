"use client";
import { signUpAction } from "@/actions/authActions";
import validateEmail from "@/helpers/validateEmail";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { LoginButton } from "./LoginButton";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const decideColor = () => {
    if (email === "" || validateEmail(email)) {
      return "default";
    }
    if (!validateEmail(email)) {
      return "danger";
    }
  };
  const checkFormisFilled = () => {
    if (validateEmail(email) && name && password) {
      return true;
    } else {
      return false;
    }
  };
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(signUpAction, initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (state.message) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1000);
    }
  }, [state]);
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className="flex flex-col gap-4 h-[300px]">
      <Input
        onChange={(e) => setName(e.target.value)}
        name="name"
        isRequired
        defaultValue=""
        label="Name"
        placeholder="Enter your name"
        type="text"
      />
      <Input
        onChange={(e) => handleEmailOnChange(e)}
        color={decideColor()}
        name="email"
        isRequired
        defaultValue=""
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        defaultValue=""
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <p
        className={`${
          showErrorMessage ? "block" : "hidden"
        } text-red-700 text-small`}
      >
        {state.message}
      </p>
      <div className="flex gap-2 justify-end">
        <LoginButton
          text="Sign up"
          pendingText="Signing Up..."
          formIsFilled={checkFormisFilled()}
        />
        {/* <Button type="submit" fullWidth color={checkFormisFilled() ? 'primary' : 'danger'} disabled={!checkFormisFilled()}>
          
          {pending ? "Signing up..." : "Sign up"}
        </Button> */}
      </div>
      <div className="flex justify-center mt-5 text-white">
        <Button color="success" size="sm">
          <Link href="/login">Login instead</Link>
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
