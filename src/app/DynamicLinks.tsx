"use client";
import { CgProfile } from "react-icons/cg";
import { FaLightbulb } from "react-icons/fa";
import { PiSunLight } from "react-icons/pi";



import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import LogoutButton from "./ClientButtons";
import { useThemeContext } from "@/providers/ThemeContextProvider";

const AvatarButton = () => {
  return <Button>me</Button>;
};

interface decodedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const DynamicLinks = ({
  user,
}: {
  user: { id: string; name: string; email: string; role: string } | null;
}) => {
  const userFromStore = useAppSelector((state: RootState) => state.auth.user);

  const [loggedInUser, setLoggedInUser] = useState(user);

  useEffect(() => {
    setLoggedInUser(userFromStore);
  }, [userFromStore]);

  const { dark, setDark } = useThemeContext();

  const toRender = () => {
    if (loggedInUser && loggedInUser.role) {
      if (loggedInUser.role === "seller") {
        return (
          <div className="flex">
            <Dropdown>
              <DropdownTrigger>
                <Button size="md" radius="full" isIconOnly>
                  <CgProfile className="w-full h-full" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <Link href="/seller">Dashboard</Link>
                </DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  <LogoutButton>Logout</LogoutButton>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      }
      if (loggedInUser.role === "customer") {
        return (
          <div className="flex">
            <Dropdown>
              <DropdownTrigger>
                <Button size="lg" radius="full" isIconOnly>
                  <CgProfile />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="cart" className="p-0">
                  <Link
                    className=" w-full h-full inline-block p-2"
                    href="/user/cart"
                  >
                    Cart
                  </Link>
                </DropdownItem>
                <DropdownItem key="orders" className="p-0">
                  <Link
                    className=" w-full h-full inline-block p-2"
                    href="/user/orders"
                  >
                    My Orders
                  </Link>
                </DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  <LogoutButton>Logout</LogoutButton>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      }
    } else {
      return (
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      );
    }
  };

  return (
    <div className="flex items-center">
      {dark ? (
        <Button
          isIconOnly
          size="md"
          radius="full"
          onClick={() => setDark(false)}
        >
          <PiSunLight />
        </Button>
      ) : (
        <Button
        isIconOnly
        size="md"
        radius="full"
        onClick={() => setDark(true)}
        >
        <FaLightbulb />
        </Button>
      )}
      <div>{toRender()}</div>
    </div>
  );
};

export default DynamicLinks;
