import CustomerDetails from "../components/CustomerDetails";
import FinalBillForm from "./FinalBillForm";
import MultiStepForm from "../components/MultiStepForm";
import ProductAdder from "../components/ProductAdder";
import { useState } from "react";

export default function BillCreateForm({ onClose }) {
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState(null);

  return (
    <MultiStepForm
      steps={[
        <ProductAdder
          key="product-adder"
          products={products}
          setProducts={setProducts}
        />,
        <CustomerDetails
          key="customer-details"
          customer={customer}
          setCustomer={setCustomer}
        />,
        <FinalBillForm
          key="final-bill-form"
          products={products}
          customer={customer}
          onClose={() => {
            onClose();
            setProducts([]);
            setCustomer(null);
          }}
        />,
      ]}
    />
  );
}
