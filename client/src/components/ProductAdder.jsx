import { useState } from "react";

export default function ProductAdder() {
  const [products, setProducts] = useState([]);
  return (
    <div>
      <div>
        {products.map((product) => (
          <></>
        ))}
      </div>
      <div className="m-1 mt-4 rounded-md shadow-sm bg-gray-200">
        <button className="w-full font-bold block px-4 py-2 text-sm leading-5 text-center text-gray-700 hover:bg-gray-400 hover:text-white rounded-md shadow-sm">
          Add a Product
        </button>
      </div>
    </div>
  );
}
