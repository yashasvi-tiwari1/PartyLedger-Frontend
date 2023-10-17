"use client";
import Layout from "../components/layout";
import { ReactElement } from "react";
import {
  IconHomeDollar,
  IconSquareLetterC,
  IconUserSquare,
} from "@tabler/icons-react";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

const Dashboard: NextPageWithLayout = () => {
  const navigate = useRouter();

  return (
    <>
      <div className="py-4">
        <div className="w-[980px] bg-dashboard p-6 rounded-xl">
          <span className="text-xl font-semibold "> Summary </span>
          <div className="flex justify-between mt-10 ">
            <div className="bg-orange-200 p-6 w-52 text-center rounded-lg">
              <Link href="/customer">
                <div className="flex justify-center">
                  <IconUserSquare className="w-9 h-9 text-orange-600 " />
                </div>
                <div className="font-semibold text-lg"></div>
                <div className="font-semibold text-lg text-gray-600">
                  Total Customers
                </div>
              </Link>
            </div>
            <div className="bg-green-200 flex flex-col justify-center w-52 text-center p-6 rounded-lg">
              <div className="flex justify-center">
                <IconSquareLetterC className="w-9 h-9 text-green-600" />
              </div>
              <div className="font-semibold text-lg">350</div>
              <div className="font-semibold text-lg text-gray-600">
                Tota
              </div>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconHomeDollar className="w-9 h-9 text-purple-600" />
              </div>
              <div className="font-semibold text-lg">100</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Transaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Dashboard;
