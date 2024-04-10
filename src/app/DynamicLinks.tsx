"use client";
import { CgProfile } from "react-icons/cg";

import { MdModeNight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import useAuthCookie from "@/auth-cookie/cookies";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { removeUser } from "@/redux/features/auth/authSlice";

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
                  <CgProfile className="w-full h-full"/>
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
                <DropdownItem key="new">New file</DropdownItem>
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
          <MdLightMode />
        </Button>
      ) : (
        <Button
          isIconOnly
          size="md"
          radius="full"
          onClick={() => setDark(true)}
        >
          <MdModeNight />
        </Button>
      )}
      <div>{toRender()}</div>
    </div>
  );
};

export default DynamicLinks;
