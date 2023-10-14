import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from "ledger/components/layout";
import { NextPageWithLayout } from "./_app";
import { BASEURL } from "./api/api";
import { toast } from "react-toastify";
import { api } from "ledger/helper/api";
import PayDialog from "./pay-dialog";
import CustomerDialog from "ledger/pages/customer-dialog";
import ConfirmationDialog from "ledger/components/confirmation";

export interface customerData {
  id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
  balance: number;
}

const Customer: NextPageWithLayout = () => {
  const [customers, setCustomers] = useState<customerData[]>([]);
  const [search, setSearch] = useState<customerData[]>(customers);
  const [isCustomerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<customerData | null>(
    null,
  );
  const [deleteCustomer, setDeleteCustomer] = useState({ name: "" });

  const fetchCustomer = useCallback(() => {
    api
      .get(`/customer`)
      .then((response) => {
        setCustomers(response.data.data);
        console.log(response.data);
      })

      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }, [BASEURL]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  useEffect(() => {
    setSearch(customers);
  }, [customers]);

  const router = useRouter();
  const handleEdit = (customer: customerData) => {
    setIsEditing(true);
    setEditedCustomer(customer);
  };

  const handleSearch = (e: any) => {
    setSearch(
      customers.filter((list) =>
        e.target.value !== " "
          ? list.name.toLowerCase().startsWith(e.target.value)
          : list,
      ),
    );
  };

  const [selectedCustomer, setSelectedCustomer] = React.useState();
  const openDialog = (customer: any) => {
    setDialogOpen(true);
    setSelectedCustomer(customer);
  };
  const closeDialog = () => {
    fetchCustomer();
    setDialogOpen(false);
  };
  const openCustomerDialog = (customer: any) => {
    setCustomerDialogOpen(true);
    setSelectedCustomer(customer);
  };

  const closeCustomerDialog = () => {
    setCustomerDialogOpen(false);
  };

  const handleConfirmDelete = (id: string) => {
    api
      .delete(`/customer/${id}`)
      .then((response) => {
        fetchCustomer();
        toast.success(response.data.message, { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });

    setConfirmationDialogOpen(false);
  };
  const handleDeleteClick = (customer: any) => {
    setDeleteCustomer({ name: customer.name });
    setConfirmationDialogOpen(true);
    // Open the confirmation dialog when delete button is clicked
  };
  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-lg">
              Total customers: {customers?.length}
            </span>
          </div>
          <div className="relative customer-search">
            <input
              type="search"
              placeholder="Search customer ..."
              className="p-2 border rounded-lg px-12 "
              onChange={handleSearch}
            />
            <IconSearch className="absolute -mt-8  ml-3 text-gray-500" />
          </div>
        </div>
        <div className="px-4 flex justify-center mx-auto container mt-10">
          <table className="border-2 table-auto text-center">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">SN</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Credit Amount</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
                <th className="border px-4 py-2">Pay</th>
              </tr>
            </thead>
            {customers?.length > 0 && (
              <tbody>
                {search.map((customer, index) => (
                  <tr key={customer.id}>
                    <td className="border px-4 py-2"> {index + 1} </td>
                    <td className="border px-4 py-2"> {customer.name} </td>
                    <td className="border px-4 py-2"> {customer.email}</td>
                    <td className="border px-4 py-2"> {customer.address}</td>
                    <td className="border px-4 py-2"> {customer.contact}</td>
                    <td className="border px-4 py-2"> {customer.balance}</td>
                    <td className="border px-4 py-2">
                      <IconEdit
                        onClick={() => openCustomerDialog(customer)}
                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                      />
                      <CustomerDialog
                        isOpen={isCustomerDialogOpen}
                        onClose={closeCustomerDialog}
                        customer={selectedCustomer}
                      />
                    </td>
                    <td className="border px-4 py-2 ">
                      <IconTrash
                        onClick={() => {
                          handleDeleteClick(customer);
                        }}
                        className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                      />
                      {isConfirmationDialogOpen && (
                        <ConfirmationDialog
                          isOpen={isConfirmationDialogOpen}
                          onClose={() => setConfirmationDialogOpen(false)}
                          onConfirm={() => handleConfirmDelete(customer.id)}
                          customer={deleteCustomer}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="px-4 py-1 bg-blue-600 text-white  fony-semibold shadow-2xl rounded-lg "
                        onClick={() => {
                          openDialog(customer);
                        }}
                      >
                        PAY
                      </button>
                      <PayDialog
                        isOpen={isDialogOpen}
                        onClose={closeDialog}
                        customer={selectedCustomer}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
Customer.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Customer;
