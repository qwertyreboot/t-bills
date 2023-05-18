import Table from "./Table";
import Toggle from "./Toggle";
import { useState } from "react";

export default function FinalBillForm({ products: items, customer }) {
  const [discount, setDiscount] = useState({ value: 0, unit: "amount" });

  const totalBeforeDiscount = () =>
    items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  const totalAfterDiscount = () => {
    const currentTotal = totalBeforeDiscount();

    switch (discount.unit) {
      case "amount":
        return currentTotal - discount.value;
      case "percentage":
        return (currentTotal * (100 - discount.value)) / 100;
    }
  };

  return (
    <div className="max-w-[90%] m-auto">
      <Table
        head={["Product", "Price", "Quantity", "Total"]}
        rows={[
          ...items.map((item) => [
            item.product.name,
            item.product.price,
            item.quantity,
            item.quantity * item.product.price,
          ]),
          ["", "", "", ""],
          ["", "", "Grand Total", totalBeforeDiscount()],
        ]}
      />

      <div className="mt-6 relative w-full flex justify-end items-center">
        <input
          value={discount?.value}
          onChange={(e) => setDiscount({ ...discount, value: e.target.value })}
          type="number"
          placeholder="Discount"
          className="border border-gray-400 px-4 py-2 rounded shadow-sm"
        />

        <Toggle
          options={["amount", "percentage"]}
          onChange={(value) => setDiscount({ ...discount, unit: value })}
          className="absolute right-2 top-3"
        />
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
