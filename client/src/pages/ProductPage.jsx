import Modal from "../components/Modal";
import ProductCreateForm from "../components/ProductCreateForm";
import Table from "../components/Table";
import { useEffect } from "react";
import { useState } from "react";

export default function ProductPage() {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await (
        await fetch("http://localhost:3000/api/products", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2hhdmluIiwicGhvbmUiOiI3ODk0NTYxMjMzIiwiaWQiOiI2NDYzYjUzOWExNjYyYTRjYjMyNTg3ZDQiLCJpYXQiOjE2ODQzMDE1NDV9.M09FgtluNZn5TGQoRdqbg_bg0Wyz4UrlU2XjZ0Unsj0",
          },
        })
      ).json();

      if (response.length) {
        setProducts(response);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsCreateProductModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-400 p-2 px-10 mt-6 rounded shadow-sm cursor-pointer"
        >
          Add a New Product
        </button>
      </div>

      <Table
        className="mt-6"
        head={[
          "Name",
          "Quantity",
          "Price",
          "Buying Price",
          "Max Retail Price",
          "Discount",
          "Tax",
          "Category",
        ]}
        rows={[
          ...products.map((product) => [
            product.name,
            `${product.quantity.value} ${product.quantity.unit}`,
            product.price,
            product.buyingPrice,
            product.maximumRetailPrice,
            `${product.discount.value} ${product.discount.unit}`,
            `${product.tax.state + product.tax.central} %`,
            product.category || "Nil",
          ]),
        ]}
      />
      <Modal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      >
        <ProductCreateForm onClose={() => setIsCreateProductModalOpen(false)} />
      </Modal>
    </>
  );
}
