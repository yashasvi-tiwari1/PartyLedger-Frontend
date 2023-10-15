import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "ledger/pages/api/api";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  mTransaction: any;
}

const MoneyTransactionUpdate: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  mTransaction,
}) => {
  const [amount, setAmount] = useState(mTransaction.amount);
  const cancelButtonRef = useRef(null);
  if (!isOpen) return null;

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };
  const updateMoneyTransaction = () => {
    const info = {
      amount: parseInt(amount, 10),
    };
    console.log(info);
    axios
      .put(`${BASEURL}/moneyTransaction/${mTransaction.id}`, info)
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
                  {mTransaction.amount}
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
                      <label className="font-semibold w-full">Amount</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          onChange={handleAmount}
                          onKeyDown={handleKeyDown}
                          value={amount}
                          className="w-full border rounded-md  px-3 py-2"
                          placeholder="Enter the amount"
                        />
                      </div>
                    </div>

                    <div className="mt-10 w-full -ml-5 ">
                      <button
                        type="button"
                        onClick={updateMoneyTransaction}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-[124px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
                      >
                        UPDATE
                      </button>
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

export default MoneyTransactionUpdate;
