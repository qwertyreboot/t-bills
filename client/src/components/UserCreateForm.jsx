import { useEffect, useState } from "react";

import Toggle from "./Toggle";
import { request } from "../utils";

const initialUserState = {
  name: "",
  phone: "",
  dob: "",
  aadhaar: "",
  address: {
    location: "",
    pincode: "",
  },
  role: "staff",
  password: "",
};

export default function UserCreateForm({ onClose }) {
  const [user, setUser] = useState(initialUserState);
  const [area, setArea] = useState({ district: "", state: "" });

  useEffect(() => {
    const autoFetchDistrictAndState = async () => {
      const data = await (
        await fetch(
          `https://api.postalpincode.in/pincode/${user?.address?.pincode}`
        )
      ).json();

      const { District, State } = data?.[0]?.PostOffice?.[0];
      setArea({ district: District, state: State });
    };

    if (user?.address?.pincode.length === 6) {
      autoFetchDistrictAndState();
    } else {
      setArea({ district: "", state: "" });
    }
  }, [user?.address?.pincode]);

  return (
    <div className="min-h-56">
      <h2 className="text-2xl text-gray-500 font-bold text-center">
        Create a User
      </h2>

      <div className="flex gap-1">
        <input
          value={user?.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          type="text"
          placeholder="Name"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={user?.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          type="tel"
          placeholder="Phone"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>
      <div className="flex gap-1 items-center">
        <input
          value={user?.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          type="date"
          placeholder="DoB"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={user?.aadhaar}
          onChange={(e) => setUser({ ...user, aadhaar: e.target.value })}
          type="tel"
          placeholder="Aadhaar"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <Toggle
          options={["staff", "owner"]}
          onChange={(value) => setUser({ ...user, role: value })}
          className="!h-8 mt-1"
        />
      </div>
      <div className="flex gap-1">
        <input
          value={user?.address?.location}
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, location: e.target.value },
            })
          }
          type="text"
          placeholder="Location"
          className="mt-1 w-3/4 border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={user?.address?.pincode}
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, pincode: e.target.value },
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

      <div className="flex flex-row-reverse gap-3 items-center justify-start">
        <button
          onClick={async () => {
            const response = await request("/api/users", {
              method: "POST",
              body: user,
            });

            if (response._id) {
              setUser(initialUserState);
              onClose();
            }
          }}
          className="px-4 py-2 mt-6 rounded shadow-sm cursor-pointer bg-blue-400 text-white"
        >
          Submit
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 mt-6 rounded shadow-sm cursor-pointer bg-gray-400 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
