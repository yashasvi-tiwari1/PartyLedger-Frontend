import React, { ReactElement, useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from "ledger/components/layout";
import { NextPageWithLayout } from "./_app";
import { toast } from "react-toastify";
import { api } from "ledger/helper/api";
import BoxCombo from "ledger/components/boxCombo";
import ConfirmDeleteTransaction from "ledger/components/confirmDeleteTransaction";
import MoneyTransactionUpdate from "ledger/components/moneyTransactionUpdate";
import KhataTransactionUpdate from "ledger/components/khataTransactionUpdate";

interface transaction {
  id: string;
  item: string;
  unitPrice: number;
  paidPrice: number;
  quantity: string;
  totalPrice: number;
  createdAt: Date;
}

interface moneyTransaction {
  id: string;
  amount: string;
  createdAt: Date;
}

const Transaction: NextPageWithLayout = () => {
  const [khataTransactions, setKhataTransactions] = useState<transaction[]>([]);
  const [moneyTransactions, setMoneyTransactions] = useState<
    moneyTransaction[]
  >([]);
  const [kConfirmDelete, setKConfirmDelete] = useState(false);
  const [customer, setCustomer] = useState({});
  const [credit, setCredit] = useState(0);
  const [deletedTransaction, setDeletedTransaction] = useState<any>({});
  const [customerId, setCustomerId] = useState("");

  const [updateKTransaction, setUpdateKTransaction] = useState(false);
  const [updatedKTransaction, setUpdatedKTransaction] = useState<any>({});

  const [updateMTransaction, setUpdateMTransaction] = useState(false);
  const [updatedMTransaction, setUpdatedMTransaction] = useState<any>({});

  const router = useRouter();

  const fetchCustomer = (id: string) => {
    api
      .get(`/customer/${id} `)
      .then((response) => {
        setCustomer(response.data);
        handleBoxInput(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleBoxInput = (e: any) => {
    setCustomerId(e.id);
    setCredit(e.balance);
    console.log(e.balance);
    setKhataTransactions(e.khataTransaction);
    setMoneyTransactions(e.moneyTransaction);
  };

  const handleKTransactionDelete = (transaction: any) => {
    setDeletedTransaction(transaction);
    setKConfirmDelete(true);
  };

  const handleMEdit = (mTransaction: any) => {
    setUpdateMTransaction(true);
    setUpdatedMTransaction(mTransaction);
  };

  const handleKEdit = (kTransaction: any) => {
    setUpdateKTransaction(true);
    setUpdatedKTransaction(kTransaction);
  };
  const handleDelete = (id: string) => {
    api
      .delete(`/transaction/${id}`)
      .then((response) => {
        fetchCustomer(customerId);
        toast.success(response?.data?.message, { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const handleMoneyDelete = (id: string) => {
    api
      .delete(`/moneyTransaction/${id}`)
      .then((response) => {
        toast.success(response?.data?.message, { position: "bottom-center" });
        fetchCustomer(customerId);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const handleCloseUpdateTransactions = () => {
    setUpdateMTransaction(false);
    setUpdateKTransaction(false);
    fetchCustomer(customerId);
  };

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="relative transaction -search">
            <BoxCombo
              placeholder="Choose customer"
              getCustomerValue={(e: any) => handleBoxInput(e)}
            />
          </div>
          <span className="font-semibold  text-2xl">Credit: {credit}</span>
        </div>
        <div className="w-full font-bold text-4xl flex justify-center mt-6">
          Khata Transaction
        </div>
        <div className="px-4 flex justify-center mx-auto container mt-4">
          <table className="border-2 table-auto ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Unit Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total Price</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            {khataTransactions.map((kTransaction, index) => {
              return (
                <tbody>
                  <tr key={kTransaction.id}>
                    <td className="border px-4 py-2"> {index + 1} </td>
                    <td className="border px-4 py-2"> {kTransaction.item}</td>
                    <td className="border px-4 py-2">
                      {kTransaction.unitPrice}
                    </td>
                    <td className="border px-4 py-2">
                      {kTransaction.quantity}
                    </td>
                    <td className="border px-4 py-2">
                      {kTransaction.totalPrice}
                    </td>
                    <td className={"border px-4 py-2"}>
                      {kTransaction.createdAt.toString().slice(0, 10)}
                    </td>

                    <td className="border px-4 py-2">
                      <IconEdit
                        onClick={() => handleKEdit(kTransaction)}
                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                      />
                      {updateKTransaction && (
                        <KhataTransactionUpdate
                          isOpen={updateKTransaction}
                          onClose={handleCloseUpdateTransactions}
                          kTransaction={updatedKTransaction}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2 ">
                      <IconTrash
                        onClick={() => handleKTransactionDelete(kTransaction)}
                        className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                      />
                      {kConfirmDelete && (
                        <ConfirmDeleteTransaction
                          isOpen={kConfirmDelete}
                          onClose={() => setKConfirmDelete(false)}
                          onConfirm={() => handleDelete(deletedTransaction.id)}
                          onMConfirm={() =>
                            handleMoneyDelete(deletedTransaction.id)
                          }
                          transaction={deletedTransaction}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="w-full font-bold text-4xl flex justify-center mt-12 ">
          Money Transaction
        </div>
        <div className="px-4 flex justify-center mx-auto container mt-4 pt-2 pb-8">
          <table className="border-2 table-auto ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            {moneyTransactions.map((mTransaction, index) => {
              return (
                <tbody>
                  <tr key={mTransaction.id}>
                    <td className="border px-4 py-2"> {index + 1} </td>
                    <td className="border px-4 py-2"> {mTransaction.amount}</td>
                    <td className="border px-4 py-2">
                      {mTransaction.createdAt.toString().slice(0, 10)}
                    </td>

                    <td className="border px-4 py-2">
                      <IconEdit
                        onClick={() => handleMEdit(mTransaction)}
                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                      />
                      {updateMTransaction && (
                        <MoneyTransactionUpdate
                          isOpen={updateMTransaction}
                          onClose={handleCloseUpdateTransactions}
                          mTransaction={updatedMTransaction}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2 ">
                      <IconTrash
                        onClick={() => handleKTransactionDelete(mTransaction)}
                        className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                      />
                      {kConfirmDelete && (
                        <ConfirmDeleteTransaction
                          isOpen={kConfirmDelete}
                          onClose={() => setKConfirmDelete(false)}
                          onMConfirm={() =>
                            handleMoneyDelete(deletedTransaction.id)
                          }
                          onConfirm={() => handleDelete(deletedTransaction.id)}
                          transaction={deletedTransaction}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};
Transaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Transaction;
