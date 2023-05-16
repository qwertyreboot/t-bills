import { TbPlus, TbUser, TbX } from "react-icons/tb";

import Search from "./Search";
import { classNames } from "../utils";
import { useEffect } from "react";
import { useState } from "react";

function CustomerForm({ customer, setCustomer }) {
  const [area, setArea] = useState({ district: "", state: "" });

  useEffect(() => {
    const autoFetchDistrictAndState = async () => {
      const data = await (
        await fetch(`https://api.postalpincode.in/pincode/${customer?.pincode}`)
      ).json();

      const { District, State } = data?.[0]?.PostOffice?.[0];
      setArea({ district: District, state: State });
    };

    if (customer?.pincode.length === 6) {
      autoFetchDistrictAndState();
    } else {
      setArea({ district: "", state: "" });
    }
  }, [customer?.pincode]);

  return (
    <>
      <div className="flex gap-1">
        <input
          value={customer?.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          type="text"
          placeholder="Name"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={customer?.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          type="tel"
          placeholder="Phone"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>
      <div className="flex gap-1">
        <input
          value={customer?.location}
          onChange={(e) =>
            setCustomer({ ...customer, location: e.target.value })
          }
          type="text"
          placeholder="Location"
          className="mt-1 w-3/4 border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={customer?.pincode}
          onChange={(e) =>
            setCustomer({ ...customer, pincode: e.target.value })
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
    </>
  );
}

export default function CustomerDetails() {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customer, setCustomer] = useState(null);
  return (
    <div className="h-48 w-96">
      <div className="flex flex-row justify-around items-center gap-3 mt-5">
        <Search icon={TbUser} />
        <button
          onClick={() => setShowCustomerForm(!showCustomerForm)}
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
