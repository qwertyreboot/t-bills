import { TbPlus, TbX } from "react-icons/tb";
import { classNames, request } from "../utils";

import Dropdown from "./DropDown";
import { useEffect } from "react";
import { useState } from "react";

function CustomerForm({ customer, setCustomer }) {
  const [form, setForm] = useState(customer);
  const [area, setArea] = useState({ district: "", state: "" });

  useEffect(() => {
    const autoFetchDistrictAndState = async () => {
      const data = await (
        await fetch(
          `https://api.postalpincode.in/pincode/${form?.address?.pincode}`
        )
      ).json();

      const { District, State } = data?.[0]?.PostOffice?.[0];
      setArea({ district: District, state: State });
    };

    if (form?.address?.pincode?.length === 6) {
      autoFetchDistrictAndState();
    } else {
      setArea({ district: "", state: "" });
    }
  }, [form?.address?.pincode]);

  return (
    <>
      <div className="flex gap-1">
        <input
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          placeholder="Name"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={form?.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          type="tel"
          placeholder="Phone"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>
      <div className="flex gap-1">
        <input
          value={form?.address?.location}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, location: e.target.value },
            })
          }
          type="text"
          placeholder="Location"
          className="mt-1 w-3/4 border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={form?.address?.pincode}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, pincode: e.target.value },
            })
          }
          type="text"
          placeholder="Pincode"
          className="appearance-none mt-1 w-1/4 border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>
      <div className="flex gap-1">
        <input
          value={area?.district}
          type="text"
          placeholder="District"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
          disabled
        />

        <input
          value={area?.state}
          type="text"
          placeholder="State"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
          disabled
        />
      </div>

      <div className="flex items-center justify-end py-4">
        {!customer?._id && (
          <button
            onClick={async () => {
              const response = await request("/api/customers", {
                method: "POST",
                body: form,
              });

              if (response._id) {
                setCustomer(response);
              }
            }}
            className="px-4 py-2 rounded shadow-sm cursor-pointer bg-blue-400 text-white"
          >
            Create Customer
          </button>
        )}
      </div>
    </>
  );
}

export default function CustomerDetails({ customer, setCustomer }) {
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  return (
    <div className="min-h-48 w-96">
      <div className="flex flex-row justify-around items-center gap-3 mt-5">
        <Dropdown
          limit={5}
          className="w-full"
          fetchOptions={async (searchText) =>
            await request(`/api/customers?search=${searchText}`)
          }
          placeholder="Search Customers by name or phone number"
          label={(customer) => `${customer.name} - ${customer.phone}`}
          onSelectionChange={(customer) => {
            setCustomer(customer);
            setShowCustomerForm(true);
          }}
        />
        <button
          onClick={() => {
            setShowCustomerForm(!showCustomerForm);
            setCustomer(null);
          }}
          className={classNames(
            "rounded py-2 px-4 text-white",
            showCustomerForm ? "bg-gray-500" : "bg-blue-400"
          )}
        >
          {showCustomerForm ? <TbX size={25} /> : <TbPlus size={25} />}
        </button>
      </div>
      {showCustomerForm && (
        <CustomerForm customer={customer} setCustomer={setCustomer} />
      )}
    </div>
  );
}
