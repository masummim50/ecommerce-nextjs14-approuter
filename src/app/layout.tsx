import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import NextUiProvider from "./NextUiProvider";
import AuthProvider from "@/providers/AuthProvider";
import ThemeContextProvider from "@/providers/ThemeContextProvider";
import Provider from "@/providers/Provider";
import MyHeader from "./MyHeader";
import Main from "./main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Buy",
  description: "Best place to buy",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // delete this later
  const links = [
    { title: "Home", url: "/" },
    { title: "user", url: "/user" },
    { title: "seller", url: "/seller" },
    { title: "register", url: "/register" },
    { title: "login", url: "/login" },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Main>
            {children}
          </Main>
        </Provider>
      </body>
    </html>
  );
}
