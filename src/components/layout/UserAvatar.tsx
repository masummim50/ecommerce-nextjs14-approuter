"use client"
import useAuthCookie from "@/auth-cookie/cookies";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";

const UserAvatar = () => {
console.log("rendering avatar")
  const { removeCookies } = useAuthCookie();
  const handleLogout = ()=> {
    removeCookies("accessToken");
    redirect("/");
  }
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          <NavbarItem>
            <Button
              onClick={handleLogout}
              color="primary"
              variant="flat"
            >
              Log Out
            </Button>
          </NavbarItem>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
