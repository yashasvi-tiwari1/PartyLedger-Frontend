import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [showData, setShowData] = React.useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();
  // const showData =
  //   typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;

  // React.useEffect(() => {
  //   const showData =
  //     typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
  //   setShowData(showData);
  // }, []);

  //   if (showData) {
  //     try {
  //       const userDetails = JSON.parse(showData);

  return (
    <div className="sticky z-20 top-0 left-60 bg-dashboard ml-52 px-12 py-4">
      <div className="h-10 flex items-center justify-between">
        <span className="text-2xl font-medium tracking-wide text-gray-700">
          Dashboard
        </span>
        <div className=" font-semibold text-2xl ">Welcome Back!</div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center ">
            <div className="">
              <span className="font-semibold text-lg ml-2">
                Mr. Omkar Tiwari
              </span>
            </div>
            <div className="rounded-full bg-gray-400 border-2 border-teal-500 ">
              <Image
                src="/assets/profile.png"
                alt="profile"
                height={150}
                width={150}
                className="w-16 -mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // } catch (e) {
  //   return <div className={"text-black text-3xl "}>Haha Error bhayo</div>;
  // }
}
// }
