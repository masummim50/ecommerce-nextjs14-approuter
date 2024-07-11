"use client";

import { logoutAction } from "@/actions/authActions";
import useAuthCookie from "@/auth-cookie/cookies";
import { removeUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@nextui-org/button";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";


const LogoutButton = ({ children }: { children: string }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { removeCookies } = useAuthCookie();
  const handleLogout = async() => {
    dispatch(removeUser());
    logoutAction(pathname);
  };
  return (
    <Button fullWidth  size="sm" className="bg-transparent hover:text-white font-semibold text-red-600"   onClick={handleLogout}>
      {children} <span><MdLogout/></span>
    </Button>
  );
};

export default LogoutButton;
