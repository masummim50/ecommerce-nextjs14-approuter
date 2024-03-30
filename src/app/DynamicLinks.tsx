"use client";
import useAuthCookie from "@/auth-cookie/cookies";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { removeUser } from "@/redux/features/auth/authSlice";

import LogoutButton from "./ClientButtons";

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

  const toRender = () => {
    if (loggedInUser && loggedInUser.role) {
      if (loggedInUser.role === "seller") {
        return (
          <>
            <LogoutButton>Logout</LogoutButton>
            <Button>seller avatar</Button>
          </>
        );
      }
      if (loggedInUser.role === "customer") {
        return (
          <div>
            <LogoutButton>Logout</LogoutButton>
            <Button>user avatar</Button>
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

  return <div>{toRender()}</div>;
};

export default DynamicLinks;
