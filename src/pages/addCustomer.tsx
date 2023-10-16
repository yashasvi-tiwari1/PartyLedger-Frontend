import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "ledger/helper/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "ledger/components/layout";
import { NextPageWithLayout } from "ledger/pages/_app";

interface FormData {
  name: string;
  email: string;
  address: string;
  contact: number;
}

const AddCustomer: NextPageWithLayout = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const validationSchema = z.object({
    name: z.string().min(1, { message: "Full name is required" }).max(60),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    address: z.string().min(3, "Adress should be minimum three words").max(30),
    contact: z.string().min(9, "Phone number must be minimum 9 digits").max(10),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });
  const handleChange = (e: any) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const navigate = useRouter();
  const formSumbit = (formData: FormData, e: any) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      address: data.address,
      contact: data.contact,
    };
    api
      .post(`/customer`, userData)
      .then((response) => {
        setData(response.data);
        toast.success(response?.data?.message);
        navigate.push("/khataTransaction");
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast.error(Array.isArray(message) ? message[0] : message);
      });
  };

  return (
    <div className="bg-dashboard  p-4 rounded-lg">
      <div className="flex justify-center  ">
        <div className=" px-20 py-10 w-[600px] drop-shadow-xl">
          <div className=" p-2 text-center  font-bold text-lg tracking-wider cursor-pointer rounded-tl-xl bg-teal-500 text-white">
            <span className="text-2xl">Customer Form </span>
          </div>
          <div className="bg-white p-10 rounded-b-xl">
            <p className="font-bold text-2xl text-center text-gray-900 mb-10">
              Welcome to Party Ledger !
            </p>
            <form onSubmit={handleSubmit(formSumbit)} className="user">
              <div className="mb-5 w-full">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full "
                  {...register("name")}
                  value={data.name}
                  onChange={handleChange}
                />

                {errors.name && <span>{errors.name.message}</span>}
              </div>
              <div className="mb-5 w-full">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                  {...register("email")}
                  value={data.email}
                  onChange={handleChange}
                />

                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="mb-5 w-full">
                <input
                  type="text"
                  placeholder="Address"
                  className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                  {...register("address")}
                  value={data.address}
                  onChange={handleChange}
                />

                {errors.address && <span>{errors.address.message}</span>}
              </div>
              <div className="mb-5 w-full">
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                  {...register("contact")}
                  value={data.contact}
                  onChange={handleChange}
                />

                {errors.contact && <span>{errors.contact.message}</span>}
              </div>
              <div className="mb-2">
                <button
                  type="submit"
                  className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
AddCustomer.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddCustomer;
