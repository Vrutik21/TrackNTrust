import { Input } from "@mui/material";
import React, { useState } from "react";
import Select from "react-select";

const CustomerOrderForm = ({ customers, products, onSubmit, onCancel }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderEntries, setOrderEntries] = useState([]);
  const [availableProducts, setAvailableProducts] = useState(products);

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
  };

  const handleProductChange = (selectedOption) => {
    const newEntry = { product: selectedOption, quantity: 1 };
    setOrderEntries([...orderEntries, newEntry]);

    // Remove selected product from available products
    const updatedProducts = availableProducts.filter(
      (product) => product.id !== selectedOption.value
    );
    setAvailableProducts(updatedProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedEntries = [...orderEntries];
    updatedEntries[index].quantity = quantity;
    setOrderEntries(updatedEntries);
  };

  const handleRemoveEntry = (index) => {
    // Add removed product back to available products
    const removedProduct = orderEntries[index].product;
    console.log(removedProduct, "removedProduct");
    setAvailableProducts([
      ...availableProducts,
      { id: removedProduct.value, name: removedProduct.label },
    ]);

    const updatedEntries = [...orderEntries];
    updatedEntries.splice(index, 1);
    setOrderEntries(updatedEntries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedEntries = orderEntries.map((entry) => ({
      product_id: entry.product.value,
      quantity: Number(entry.quantity),
    }));

    onSubmit({
      customer_id: selectedCustomer?.value ?? "",
      order_entries: formattedEntries ?? null,
    });
  };

  return (
    <div className="popup-form-overlay">
      <div className="popup-form">
        <button className="close-btn" onClick={onCancel}>
          <svg
            className="close-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2>Create Order</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-control">
            <label>Customer</label>
            <Select
              value={selectedCustomer}
              onChange={handleCustomerChange}
              options={customers}
            />
          </div>
          <div className="form-control">
            <label>Products</label>
            <Select
              value={null}
              onChange={handleProductChange}
              options={availableProducts.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
            />
          </div>
          {orderEntries?.length > 0 && (
            <div className="form-control">
              <label>Order Items:</label>
              <table style={{ color: "white" }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderEntries.map((entry, index) => (
                    <tr key={index} style={{ color: "white" }}>
                      <td>{entry.product.label}</td>
                      <td>
                        <Input
                          type="number"
                          defaultValue={1}
                          sx={{
                            width: "100px",
                            color: "black",
                            background: "white",
                            borderRadius: "5px",
                            paddingLeft: "2px",
                          }}
                          value={entry.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveEntry(index)}
                          className="cancel-btn"
                          style={{ fontSize: "10px", padding: "5px" }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create Order
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerOrderForm;
