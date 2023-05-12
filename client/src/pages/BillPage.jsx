import Modal from "../components/Modal";
import MultiStepForm from "../components/MultiStepForm";
import ProductAdder from "../components/ProductAdder";
import Table from "../components/Table";
import { useState } from "react";

export default function BillPage() {
  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
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
        <MultiStepForm
          steps={[<ProductAdder />, <>step 2</>, <>step 3</>, <>step 4</>]}
        />
      </Modal>
    </>
  );
}
