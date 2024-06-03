"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import ThemeContextProvider, {
  useThemeContext,
} from "@/providers/ThemeContextProvider";
import Link from "next/link";
import useAuthCookie from "@/auth-cookie/cookies";
import { usePathname } from "next/navigation";
import useIsLoggedIn from "@/shared/isLoggedIn";
import { SearchIcon } from "./SearchIcon";
import UserAvatar from "./UserAvatar";

export default function Header({token}: {token:undefined | string}) {

  // const { dark, setDark } = useThemeContext();
  // const changetheme = () => {
  //   setDark((prev) => !prev);
  // };
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  return (
    <Navbar className="text-black dark:text-white" isBordered>
      <NavbarContent justify="start" className="grow-0">
        <NavbarBrand className="mr-1">
          <p className="block font-bold text-inherit">BESTbuy</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="grow">
        <Input
          classNames={{
            base: "max-w-full  h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          color="primary"
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent as="div" className="items-center grow" justify="end">
        {/* {isLoggedIn === null && <p>loading...</p>} */}
        {
          token ? 
          <UserAvatar />
          :
          <NavbarItem className="flex">
            <Button variant="flat" color="primary">
              <Link href="/login">Log in</Link>
            </Button>
          </NavbarItem>
        
      }

        {/* {isLoggedIn  ? (
          <UserAvatar />
        ) : (
          <NavbarItem className="flex">
              <Button variant="flat" color="primary">
            <Link href="/login">
                Log in
            </Link>
              </Button>
          </NavbarItem>
        )} */}
        {/* <Button onClick={changetheme}>theme</Button> */}
      </NavbarContent>
    </Navbar>
  );
}

{
  /* <Navbar
      className="text-black dark:text-white rounded-sm"
      onMenuOpenChange={setIsMenuOpen}
    >

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            ACME
          </Link>
        </NavbarBrand>
      </NavbarContent>


      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input fullWidth/>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isLoggedIn ?<NavbarItem>
          <Button
            onClick={() => removeCookies("accessToken")}
            color="primary"
            variant="flat"
          >
            Log Out
          </Button>
        </NavbarItem>
       
        :
         <NavbarItem className="flex">
         <Link href="/login">
          <Button variant="flat" color="primary">Log in</Button>
         </Link>
       </NavbarItem>
}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar> */
}
