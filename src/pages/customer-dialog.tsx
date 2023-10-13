import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import axios from "axios";
import { BASEURL } from "./api/api";
import { toast } from "react-toastify";
import { id } from "postcss-selector-parser";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: any;
}

const CustomerDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  customer = { name: "", email: "", address: "", contact: "" },
}) => {
  const [oldData, setOldData] = useState(customer); // Initial data
  const [updatedData, setUpdatedData] = useState({
    name: customer.name,
    email: customer.email,
    address: customer.address,
    contact: customer.contact,
  });
  const updateCostumer = () => {
    const info = {
      customerId: customer.id,
      ...updatedData,
    };
    console.log(info);
    axios
      .put(`${BASEURL}/customer/${id}`, info)
      .then((response) => {
        toast.success(response?.data.message);
        onClose();
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    setUpdatedData({
      name: customer.name,
      email: customer.email,
      address: customer.address,
      contact: customer.contact,
    });
  }, [customer]);
  const cancelButtonRef = useRef(null);
  if (!isOpen) return null;
  // Separate change handlers for each input field
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      address: e.target.value,
    }));
  };

  const handlePhoneNumberChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      phoneNumber: e.target.value,
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={() => null}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-max sm:max-h-2xl sm:h-full pr-3 ">
              <div className="flex ">
                <Image
                  src="/assets/customer.png"
                  alt="logo"
                  height={220}
                  width={220}
                  className=" w-24 h-24 p-4 cursor-pointer "
                />

                <div className="text-2xl font-semibold  py-8 px-2">
                  {customer.name}
                </div>
              </div>

              <div className="bg-white px-4 pr-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-4 tracking-tight text-gray-700 w-max"
                    ></Dialog.Title>
                    <div className="mt-6">
                      <input
                        type="text"
                        onChange={handleNameChange}
                        className="w-full border rounded-md  px-3 py-2"
                        placeholder="Enter the Name"
                      />
                    </div>
                    <div className="mt-6">
                      <input
                        type="text"
                        onChange={handleEmailChange}
                        className="w-full border rounded-md  px-3 py-2"
                        placeholder="Enter the email"
                      />
                    </div>
                    <div className="mt-6">
                      <input
                        type="text"
                        onChange={handleAddressChange}
                        className="w-full border rounded-md  px-3 py-2"
                        placeholder="Enter the address"
                      />
                    </div>
                    <div className="mt-6">
                      <input
                        type="text"
                        onChange={handlePhoneNumberChange}
                        className="w-full border rounded-md  px-3 py-2"
                        placeholder="Enter the phone number"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-center -ml-3">
                      <div className="mt-10 w-full  ">
                        <button
                          type="button"
                          onClick={updateCostumer}
                          className="  w-full justify-center rounded-md bg-blue-600 px-[124px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
                        >
                          UPDATE
                        </button>
                      </div>
                      <div className="mt-3 pb-2">
                        <button
                          type="button"
                          className=" w-full justify-center rounded-md bg-red-600 px-[124px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto"
                          onClick={onClose}
                          ref={cancelButtonRef}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CustomerDialog;
