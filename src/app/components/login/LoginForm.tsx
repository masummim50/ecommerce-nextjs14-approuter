"use client";
import { loginAction } from "@/actions/authActions";
import validateEmail from "@/helpers/validateEmail";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { LoginButton } from "./LoginButton";

const LoginForm = () => {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
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
    if (validateEmail(email) && password) {
      return true;
    } else {
      return false;
    }
  };
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(loginAction, initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (state.message) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1000);
    }
  }, [state]);

  const handleUseTestingAccount = ()=> {
    setEmail('user1@gmail.com');
    setPassword('1234');
  }

  return (
    <>
    <div className="text-right">
      <button className="bg-purple-600 px-2 py-1 rounded-md text-white hover:bg-purple-700" onClick={handleUseTestingAccount}>Use Testing account</button>
    </div>
    <form action={formAction} autoComplete="off">
      <Input
        onChange={(e) => handleEmailOnChange(e)}
        color={decideColor()}
        // defaultValue=""
        value={email}
        label="Email"
        name="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        // defaultValue=""
        value={password}
        name="password"
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
       
        <LoginButton  text="Login" pendingText="Loggin In..." formIsFilled={checkFormisFilled()}/>
      </div>
      <div className="flex justify-center mt-5">
        <Button color="success" size="sm">
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    </form>
    
    </>
  );
};

export default LoginForm;

{
  /* <form className="flex flex-col gap-4">
      <Input
        defaultValue=""
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        defaultValue=""
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
      />

      <div className="flex gap-2 justify-end">
        <Button onClick={handleLoginSubmit} fullWidth color="primary">
          Login
        </Button>
      </div>
    </form> */
}
