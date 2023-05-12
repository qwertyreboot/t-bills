import Dropdown from "./DropDown";
import { useState } from "react";

function Row({ onProductChange, onQuantityChange, product, quantity }) {
  return (
    <div className="flex items-center justify-around gap-2">
      <Dropdown
        limit={5}
        className="w-full"
        options={["onions", "carrots", "beetroots", "onions", "carrots"]}
        initialSearchText={product}
        onSelectionChange={onProductChange}
      />
      <div className="relative">
        <input
          type="number"
          className="border border-gray-600 p-1.5 w-28 rounded shadow"
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
        />
        <span className="absolute right-1 top-1.5 p-1.5 text-xs bg-gray-500 text-white rounded ">
          gram
        </span>
      </div>
    </div>
  );
}

export default function ProductAdder() {
  const [rows, setRows] = useState([]);
  return (
    <div>
      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <Row
            key={i}
            {...row}
            onProductChange={(product) => {
              const newRows = [...rows];
              newRows[i].product = product;
              setRows(newRows);
            }}
            onQuantityChange={(quantity) => {
              const newRows = [...rows];
              newRows[i].quantity = quantity;
              setRows(newRows);
            }}
          />
        ))}
      </div>
      <div
        onClick={() =>
          setRows((prev) => [...prev, { product: null, quantity: 0 }])
        }
        className="m-1 mt-4 rounded-md shadow-sm bg-gray-200"
      >
        <button className="w-full font-bold block px-4 py-2 text-sm leading-5 text-center text-gray-700 hover:bg-gray-400 hover:text-white rounded-md shadow-sm">
          Add a Product
        </button>
      </div>
    </div>
  );
}
