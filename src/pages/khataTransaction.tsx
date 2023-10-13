import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "ledger/helper/api";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { input, z } from "zod";
import { NextPageWithLayout } from "./_app";
import Layout from "ledger/components/layout";
import BoxCombo from "ledger/components/boxCombo";

const validationSchema = z.object({
  customerId: z.string().min(1, { message: " CustomerId is required" }).max(60),
  item: z.string().min(1, { message: "item is required" }),
  unitPrice: z.number().min(1, { message: "unitPrice is required" }),
  quantity: z.number().min(1, "Quantity is required"),
});

type Schema = z.infer<typeof validationSchema>;
const KhataTransaction: NextPageWithLayout = () => {
  const [data, setData] = useState({
    customerName: "",
    item: "",
    unitPrice: undefined,
    quantity: undefined,
  });
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(validationSchema),
  });
  const handleChange = (e: any) => {
    const value = e.target.value;
    console.log("Setting value for", e.target.name, "to", value);
    if (e.target.name == "unitPrice") setUnitPrice(e.target.value);
    if (e.target.name == "quantity") setQuantity(e.target.value);
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const navigate = useRouter();
  const handleTotalPrice = () => {
    setTotalPrice(unitPrice * quantity);
  };
  const formSubmit = (data: Schema) => {
    const userData = {
      customerId,
      item: data.item,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      totalPrice: totalPrice,
    };
    setCustomers(userData);
    api
      .post(`/transaction`, userData)
      .then((response) => {
        setData(response.data);
        toast.success(response.data.message);
        void navigate.push("/transaction");
      })
      .catch((error) => {
        alert(error?.response?.message);
      });
  };
  const handleBoxInput = (e: any) => {
    setCustomerId(e.id);
    setValue("customerId", e.id, { shouldValidate: true });
  };
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = ""; // Clear the input value when clicked
  };
  return (
    <div className="flex justify-center">
      <div className=" px-20 py-10 w-[600px] drop-shadow-xl ">
        <div className=" p-2 text-center  font-bold text-lg tracking-wider cursor-pointer rounded-tl-xl bg-teal-500 text-white">
          <span className="text-2xl">Khata Transaction Entry Form </span>
        </div>
        <div className="bg-white p-10 rounded-b-xl">
          <p className="font-bold text-2xl text-center text-gray-900 mb-10">
            Welcome to Party Ledger !
          </p>
          <form onSubmit={handleSubmit(formSubmit)} className="user">
            <div className="mb-5 w-full">
              <BoxCombo
                placeholder="Choose customer"
                getCustomerValue={(e: any) => handleBoxInput(e)}
              />
              {errors.customerId && <span>{errors.customerId.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Item Name"
                className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                {...register("item")}
                value={data.item}
                onChange={handleChange}
              />
              {errors.item && <span>{errors.item.message}</span>}
            </div>

            <div className="mb-5 w-full">
              <input
                type="number"
                placeholder="unit Price"
                className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                {...register("unitPrice", { valueAsNumber: true })}
                value={data.unitPrice}
                onChange={handleChange}
              />
              {errors.unitPrice && <span>{errors.unitPrice.message}</span>}
            </div>

            <div className="mb-5 w-full">
              <input
                type="number"
                placeholder="quantity"
                className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                {...register("quantity", { valueAsNumber: true })}
                value={data.quantity}
                onChange={handleChange}
              />
              {errors.unitPrice && <span>{errors.unitPrice.message}</span>}
            </div>

            <div className="mb-5 w-full">
              <input
                type="number"
                placeholder="total Price"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                value={totalPrice}
                onClick={handleTotalPrice}
              />
            </div>
            <div className="mb-2">
              <button
                type="submit"
                className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
KhataTransaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default KhataTransaction;
