import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { BASEURL } from "ledger/pages/api/api";
import Link from "next/link";
import { customerData } from "ledger/pages/customer";

interface SearchProp {
  getCustomerValue: (val: any) => void;
  placeholder?: string;
}
export default function BoxCombo({
  getCustomerValue,
  placeholder,
}: SearchProp) {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<customerData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        await axios
          .get(`${BASEURL}/customer`, { params: { searchKey: query } })
          .then((res: any) => {
            if (Array.isArray(res.data.data)) {
              setCustomers(res.data.data);
            }
          })
          .catch()
          .finally(() => setLoading(false));
      } catch (e) {
        console.log("error");
      }
    };
    fetchCustomers();
  }, [query]);

  const [selected, setSelected] = useState(customers[0]);

  const filteredPeople =
    query === ""
      ? customers
      : customers.filter((customer) =>
          customer.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Combobox value={selected} onChange={getCustomerValue}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden">
          <Combobox.Input
            placeholder={placeholder}
            className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
            displayValue={(customer: any) =>
              `${customer.name}, ${customer.address}`
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== "" ? (
              <Link href="/addCustomer" className="hover:font-bold">
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700 hover:bg-gray-400">
                  Add Customer
                </div>
              </Link>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "text-white bg-gray-800 " : "text-black"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name + ", " + person.address}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
