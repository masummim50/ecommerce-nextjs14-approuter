"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

import { Cookies } from "react-cookie";
import useAuthCookie from "@/auth-cookie/cookies";
import { redirect, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/login/SignUpForm";
import SellerLoginForm from "../components/login/SellerLoginForm";


export default function App() {
  const searchParams = useSearchParams()

  const tab = searchParams.get('tab');
  const [selected, setSelected] = React.useState<string | number>(tab? tab : "user");


  return (
    <div className="flex w-full items-center justify-center mt-3">
      <div className="flex flex-col w-full items-center justify-center">
        <Card className="max-w-full w-[340px] h-[350px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="user" title="Login">
                <LoginForm/>
              </Tab>
              <Tab key="seller" title="Seller Login">
                <SellerLoginForm/>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
