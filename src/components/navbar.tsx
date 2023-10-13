import {
  IconBell,
  IconChevronDown,
  IconSearch,
  IconUserBolt,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

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

        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center">
            <div>
              <IconUserBolt />
            </div>
            <div className="">
              <p></p>
              {/* <p className="-mt-1"> {userDetails.name}</p> */}
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
