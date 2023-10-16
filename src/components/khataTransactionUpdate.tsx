import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { api } from "ledger/helper/api";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  kTransaction: any;
}

const KhataTransactionUpdate: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  kTransaction,
}: DialogProps) => {
  const [totalPrice, setTotalPrice] = useState(kTransaction.totalPrice);
  const [unitPrice, setUnitPrice] = useState(kTransaction.unitPrice);
  const [quantity, setQuantity] = useState(kTransaction.quantity);
  const [item, setItem] = useState(kTransaction.item);
  const cancelButtonRef = useRef(null);

  if (!isOpen) return null;

  console.log(kTransaction);

  console.log(unitPrice, item, quantity, totalPrice);

  const handleItemChange = (e: any) => {
    setItem(e.target.value);
    console.log(e.target.value);
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const handleUnitPriceChange = (e: any) => {
    setUnitPrice(e.target.value);
  };

  const handleTotalPrice = () => {
    setTotalPrice(unitPrice * quantity);
  };

  const updateKTransaction = () => {
    const userData = {
      item,
      unitPrice,
      quantity,
      totalPrice,
    };
    api
      .put(`/transaction/${kTransaction.id}`, userData)
      .then((response) => {
        toast.success(response?.data?.message);
        onClose();
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast.error(Array.isArray(message) ? message[0] : message);
      });
  };

  const handleKeyDown = (e: any) => {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const key = e.key;

    if (!allowedKeys.includes(key) && e.key.length === 1) {
      e.preventDefault();
    }
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
                  src="/assets/pay.png"
                  alt="logo"
                  height={220}
                  width={220}
                  className=" w-24 h-24 p-4 cursor-pointer -mt-4"
                />

                <div className="text-2xl font-semibold  py-4 px-2">
                  <span className="font-semibold mr-3">Update</span>
                  {kTransaction.item}
                </div>
              </div>

              <div className="bg-white px-4 pr-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-4 tracking-tight text-gray-700 w-max"
                    ></Dialog.Title>

                    <div>
                      <div className="mb-5 w-full">
                        <input
                          type="text"
                          placeholder="Item Name"
                          className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                          value={item}
                          onChange={handleItemChange}
                          required={true}
                        />
                      </div>

                      <div className="mb-5 w-full">
                        <input
                          type="number"
                          placeholder="unit Price"
                          onKeyDown={handleKeyDown}
                          className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                          value={unitPrice}
                          onChange={handleUnitPriceChange}
                        />
                      </div>

                      <div className="mb-5 w-full">
                        <input
                          type="number"
                          placeholder="quantity"
                          onKeyDown={handleKeyDown}
                          className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>

                      <div className="mb-5 w-full">
                        <input
                          type="number"
                          placeholder="total Price"
                          className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                          value={totalPrice}
                          onClick={handleTotalPrice}
                          readOnly={true}
                        />
                      </div>

                      <div className="mt-6 w-full -ml-5 ">
                        <button
                          type="button"
                          onClick={updateKTransaction}
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-[124px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pb-2">
                      <button
                        type="button"
                        className="mt-3 -ml-2 w-full text-gray-800 inline-flex justify-center rounded-md bg-gray-300 px-[124px] py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default KhataTransactionUpdate;
