import Table from "../components/Table";
import { request } from "../utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ViewBillPage() {
  let { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      const response = await request(`/api/bills/${id}`);
      console.log(response);
      if (response._id) {
        setBill(response);
      }
    };

    if (id) {
      fetchBill();
    }
  }, [id]);

  const totalBeforeDiscount = () =>
    bill?.items?.reduce?.(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

  const totalAfterDiscount = () => {
    const currentTotal = totalBeforeDiscount();

    switch (bill?.discount?.unit) {
      case "amount":
        return currentTotal - bill?.discount?.value;
      case "percentage":
        return (currentTotal * (100 - bill?.discount?.value)) / 100;
    }
  };

  return (
    <div className="mt-16 max-w-[90%] m-auto">
      <Table
        head={["Product", "Price", "Quantity", "Total"]}
        rows={[
          ...(bill?.items?.map?.((item) => [
            item.product.name,
            item.product.price,
            item.quantity,
            item.quantity * item.product.price,
          ]) || []),
          ["", "", "", ""],
          ["", "", "Grand Total", totalBeforeDiscount()],
        ]}
      />

      <div className="mt-6 relative w-full flex justify-end items-end gap-4">
        <span className="text-gray-800 text-base font-bold">Discount:</span>
        <h2 className="text-xl font-bold text-gray-600">
          {`${bill?.discount?.value} ${bill?.discount?.unit}`}
        </h2>
      </div>

      <div className="mt-6 relative w-full flex justify-end items-end gap-4">
        <span className="text-gray-800 text-lg font-bold">Total:</span>
        <h2 className="text-3xl font-bold text-gray-600">
          {totalAfterDiscount()}
        </h2>
      </div>
    </div>
  );
}
