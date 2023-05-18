import BillCreateForm from "../components/BillCreateForm";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { request } from "../utils";
import { useEffect } from "react";
import { useState } from "react";

export default function BillPage() {
  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await request("/api/bills");

      if (response.length) {
        setBills(response);
      }
    };

    fetchBills();
  }, [isCreateBillModalOpen]);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsCreateBillModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-400 p-2 px-10 mt-6 rounded shadow-sm cursor-pointer"
        >
          Make a New Bill
        </button>
      </div>

      <Table
        className="mt-6"
        head={["ID", "Number of Products", ""]}
        rows={bills.map((bill) => [
          bill?._id,
          bill?.items?.length,
          <a
            key={bill?._id}
            className="cursor-pointer text-blue-400 hover:text-blue-700"
            href={`/bills/${bill?._id}`}
          >
            view
          </a>,
        ])}
      />
      <Modal
        isOpen={isCreateBillModalOpen}
        onClose={() => setIsCreateBillModalOpen(false)}
      >
        <BillCreateForm onClose={() => setIsCreateBillModalOpen(false)} />
      </Modal>
    </>
  );
}
