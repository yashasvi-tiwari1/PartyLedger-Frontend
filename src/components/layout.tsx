import { ReactNode, useEffect, useReducer, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const navigate = useRouter();
  // const [loggedIn, setLoggedIn] = useState<string | null>("");
  // useEffect(() => {
  //   setLoggedIn(localStorage.getItem("userInfo"));
  // }, []);
  // if (loggedIn !== null) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-200 flex">
        <Sidebar />
        <div className="flex-grow pl-60 pr-8 pt-6">{children}</div>
      </main>
    </>
  );
  // } else {
  //   navigate.push("/login");
  // }
}
