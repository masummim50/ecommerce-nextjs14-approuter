"use client";

import useAuthCookie from "@/auth-cookie/cookies";
import { removeUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@nextui-org/button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";


const LogoutButton = ({children}:{children:string}) => {
  
  const dispatch = useAppDispatch();
    const router = useRouter()
    const {removeCookies} = useAuthCookie()
    const handleLogout = () => {
      dispatch(removeUser())
      removeCookies("accessToken")
      router.push("/")
    };
    return <Button size="sm" onClick={handleLogout}>{children}</Button>;
};

export default LogoutButton;