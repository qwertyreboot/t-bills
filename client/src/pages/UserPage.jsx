import Modal from "../components/Modal";
import Table from "../components/Table";
import UserCreateForm from "../components/UserCreateForm";
import { request } from "../utils";
import { useEffect } from "react";
import { useState } from "react";

export default function UserPage() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await request("/api/users");

      if (response.length) {
        console.log(response);
        setUsers(response);
      }
    };

    fetchUsers();
  }, [isCreateUserModalOpen]);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsCreateUserModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-400 p-2 px-10 mt-6 rounded shadow-sm cursor-pointer"
        >
          Add a New User
        </button>
      </div>

      <Table
        className="mt-6"
        head={[
          "Name",
          "Phone",
          "DoB",
          "Aadhaar",
          "Location",
          "Pincode",
          "Role",
        ]}
        rows={[
          ...users.map((user) => [
            user.name,
            user.phone,
            new Date(user.dob).toISOString().slice(0, 10),
            user.aadhaar,
            user.address?.location,
            user.address?.pincode,
            user.role,
          ]),
        ]}
      />
      <Modal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      >
        <UserCreateForm onClose={() => setIsCreateUserModalOpen(false)} />
      </Modal>
    </>
  );
}
