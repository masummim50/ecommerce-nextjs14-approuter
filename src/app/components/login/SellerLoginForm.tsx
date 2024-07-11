import { loginAction, sellerLoginAction } from "@/actions/authActions";
import validateEmail from "@/helpers/validateEmail";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { LoginButton } from "./LoginButton";

const SellerLoginForm = () => {
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
  const [state, formAction] = useFormState(sellerLoginAction, initialState);
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


  const handleUseTestingAccount = ()=> {
    setEmail('seller1@gmail.com');
    setPassword('1234');
  }


  return (
    <>
    <div className="text-right">
      <button className="bg-purple-600 px-2 py-1 rounded-md text-white hover:bg-purple-700" onClick={handleUseTestingAccount}>Use Testing account</button>
    </div>
    <form action={formAction}>
      <Input
        onChange={(e) => handleEmailOnChange(e)}
        color={decideColor()}
        value={email}
        label="Email"
        name="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        value={password}
        name="password"
      />
      <p className={`${showErrorMessage ? "block" : "hidden"} text-red-700 text-small`}>
        {state.message}
      </p>
      <div className="flex gap-2 justify-end">
        <LoginButton text="Login as Seller" pendingText="Logging In..." formIsFilled={checkFormisFilled()}/>
        {/* <Button
        type="submit"
          fullWidth
          color={checkFormisFilled() ? "primary" : "danger"}
          disabled={!checkFormisFilled()}
        >
          {pending ? "Logging in..." : "Login as seller"}
        </Button> */}
      </div>
      <div className="flex justify-center mt-5">
        <Button color="success" size="sm">
          <Link href="/register?tab=seller">Sign up as Seller instead</Link>
        </Button>
      </div>
    </form>
    </>
  );
};

export default SellerLoginForm;
