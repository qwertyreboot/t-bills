import Dropdown from "./DropDown";
import Toggle from "./Toggle";
import { request } from "../utils";
import { useState } from "react";

const initialProductState = {
  name: "",
  quantity: { value: 0, unit: "peice" },
  price: 0,
  buyingPrice: 0,
  maxRetailPrice: 0,
  category: null,
  discount: { value: 0, unit: "amount" },
  tax: { central: 9, state: 9 },
};

export default function ProductCreateForm({ onClose }) {
  const [product, setProduct] = useState(initialProductState);

  return (
    <div className="min-h-56">
      <h2 className="text-2xl text-gray-500 font-bold text-center">
        Create a Product
      </h2>
      <div className="flex gap-1 mt-2">
        <input
          value={product?.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          type="text"
          placeholder="Name"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <div className="relative">
          <input
            value={product?.quantity?.value}
            onChange={(e) =>
              setProduct({
                ...product,
                quantity: { ...product.quantity, value: e.target.value },
              })
            }
            type="number"
            placeholder="Quantity"
            className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
          />

          <Toggle
            options={["peice", "g", "l", "m"]}
            onChange={(value) =>
              setProduct({
                ...product,
                quantity: { ...product.quantity, unit: value },
              })
            }
            className="absolute right-1 top-2.5 p-1.5 text-xs bg-gray-500 text-white rounded"
          />
        </div>
      </div>

      <div className="flex gap-1 mt-2">
        <input
          value={product?.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          type="number"
          placeholder="Price"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={product?.buyingPrice}
          onChange={(e) =>
            setProduct({ ...product, buyingPrice: e.target.value })
          }
          type="number"
          placeholder="Buying Price"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={product?.maxRetailPrice}
          onChange={(e) =>
            setProduct({ ...product, maxRetailPrice: e.target.value })
          }
          type="number"
          placeholder="Max Retail Price"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>

      <div className="flex gap-1 mt-2 items-center">
        <Dropdown
          placeholder="Category"
          options={["kitchenwares", "plastics", "hellothere", "hiyo"]}
          onChange={(value) => setProduct({ ...product, category: value })}
          className="w-full mt-1"
        />

        <div className="relative">
          <input
            value={product?.discount?.value}
            onChange={(e) =>
              setProduct({
                ...product,
                discount: { ...product.discount, value: e.target.value },
              })
            }
            type="number"
            placeholder="Discount"
            className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
          />

          <Toggle
            options={["amount", "percentage"]}
            onChange={(value) =>
              setProduct({
                ...product,
                discount: { ...product.discount, unit: value },
              })
            }
            className="absolute right-1 top-2.5 p-1.5 text-xs bg-gray-500 text-white rounded"
          />
        </div>
      </div>

      <div className="flex gap-1 mt-2">
        <input
          value={product?.tax?.central}
          onChange={(e) =>
            setProduct({
              ...product,
              tax: { ...product.tax, central: e.target.value },
            })
          }
          type="number"
          placeholder="CGST"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />

        <input
          value={product?.tax?.state}
          onChange={(e) =>
            setProduct({
              ...product,
              tax: { ...product.tax, state: e.target.value },
            })
          }
          type="number"
          placeholder="SGST"
          className="mt-1 w-full border border-gray-400 rounded py-2 px-4 text-sm"
        />
      </div>

      <div className="flex flex-row-reverse gap-3 items-center justify-start">
        <button
          onClick={async () => {
            const response = await request("/api/products", {
              method: "POST",
              body: product,
            });

            if (response._id) {
              setProduct(initialProductState);
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
