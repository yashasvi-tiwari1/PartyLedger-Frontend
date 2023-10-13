import Image from "next/image";
import {
  IconHomeDollar,
  IconLayoutDashboard,
  IconLogout,
   IconUserCircle, IconUserPlus,
  IconVocabulary,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { removeLoginInfo } from "play/helpers/api";

export default function Sidebar() {
  const [userDetails, setUserDetails] = useState<string | null>("");
  const navigate = useRouter();

  const handleLogOut = () => {
    // removeLoginInfo();
    navigate.push("/login");
  };

  //   useEffect(() => {
  //     setUserDetails(localStorage.getItem("userInfo"));
  //   }, [userDetails]);
  //   if (userDetails) {
  //     try {
  //       const showUser = JSON.parse(userDetails);
  return (
    <div className="w-52 z-10 fixed inset-y-0 bg-dashboard">
      <div className="p-6">
        <div className=" gap-2 mb-12 -mt-5 items-center">
          <Image
            src="/assets/logo.png"
            alt="logo"
            height={220}
            width={220}
            className=" w-24 h-24 p-4 cursor-pointer"
            onClick={() => navigate.push("/")}
          />
          <div className="">
            <span className="font-semibold text-xl tracking-wide ">
              Party Ledger
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-6 mb-8 cursor-pointer">
            <Link href="/" className="dashboard_text gap-6 flex">
              <IconLayoutDashboard className=" w-6 h-6" />
              Dashboard
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/customer" className="dashboard_text flex gap-6">
              <IconUserCircle className=" w-6 h-6" />
              Customer
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/addCustomer" className="dashboard_text flex gap-6">
              <IconUserPlus className=" w-6 h-6" />
              Add Customer
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/khataTransaction"
              className="dashboard_text flex gap-6"
            >
              <IconVocabulary className=" w-6 h-6" />
              Khata
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/transaction" className="dashboard_text flex gap-6">
              <IconHomeDollar className=" w-6 h-6" />
              Transaction
            </Link>
          </div>
          <div className="dashboarcd_item">
            <button
              className="dashboard_text flex gap-6"
              onClick={handleLogOut}
            >
              <IconLogout className=" w-6 h-6" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // } catch (e) {
  //   return <div className="text-2xl"> Loading.... </div>;
  // }
}
// },
