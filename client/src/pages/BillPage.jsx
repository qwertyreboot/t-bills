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
  });

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
        head={["NAME", "TITLE", "EMAIL", "ROLE"]}
        rows={[
          [
            "Khavin Shankar",
            "Full Stack Dev",
            "khavinshankar@gmail.com",
            "Full Stack Dev",
          ],
          [
            "Khavin Shankar",
            "Full Stack Dev",
            "khavinshankar@gmail.com",
            "Full Stack Dev",
          ],
          [
            "Khavin Shankar",
            "Full Stack Dev",
            "khavinshankar@gmail.com",
            "Full Stack Dev",
          ],
          [
            "Khavin Shankar",
            "Full Stack Dev",
            "khavinshankar@gmail.com",
            "Full Stack Dev",
          ],
        ]}
      />
      <Modal
        isOpen={isCreateBillModalOpen}
        onClose={() => setIsCreateBillModalOpen(false)}
      >
        <BillCreateForm />
      </Modal>
    </>
  );
}
