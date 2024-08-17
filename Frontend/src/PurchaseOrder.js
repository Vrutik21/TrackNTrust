import React, { useEffect, useState } from "react";
import { formatDateTime, trimStatus } from "./shared/helper";
import Sidebar from "./Sidebar";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CustomerOrderForm from "./CreatePurchaseOrder";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useAuth from "./shared/userAuth";

const PurchaseOrder = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const [responseData, setResponseData] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showCreateForm, setCreateShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: orderData.id || "",
    status: { value: "", label: "" },
    description: "",
  });
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const { customerId, userId } = useParams();
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    fetchData();
    getCustomerData();
    getProductsData();
  }, [customerId, isAuthenticated]);

  const fetchData = async () => {
    if (customerId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/customer/${customerId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setResponseData(response.data.orders);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    } else if (userId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setResponseData(response.data.orders);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/purchase-order`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  };

  const options = [
    { value: "initiated", label: "Initiated" },
    { value: "in_progress", label: "In Progress" },
    { value: "in_transit", label: "In Transit" },
    { value: "reached_facility", label: "Reached Facility" },
    { value: "ready_for_dispatch", label: "Ready For Dispatch" },
    { value: "out_for_delivery", label: "Out For Delivery" },
    { value: "failed_to_deliver", label: "Failed to Deliver" },
    { value: "delivered_to_customer", label: "Delivered To Customer" },
    // { value: "locker_assigned", label: "Locker Assigned" },
    // { value: "delivered_to_locker", label: "Delivered To Locker" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject("Geolocation not supported");
      }
    });
  };

  const onEditClick = (id) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/purchase-order/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const data = response.data;
        setOrderData(data);
        console.log(data, "orderData");
        setFormData((prevProps) => ({
          ...prevProps,
          id: id,
          status: {
            value: data.status,
            label: trimStatus(data.status),
          },
          description: "",
        }));
        setShowForm(true);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  };

  const onSubmit = async () => {
    try {
      const currentLocation = await getLocation();
      setShowForm(false);

      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/purchase-order/${formData.id}`,
        {
          status: formData.status.value,
          user_id: "d4eb0faf-294c-4454-872a-a8bb5a38529a",
          loc_lat: currentLocation.latitude,
          loc_lon: currentLocation.longitude,
          description: formData.description,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/purchase-order`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const data = response.data;
      setResponseData(data);
      setFormData(null);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (selectedOption) => {
    setFormData((prevProps) => ({
      ...prevProps,
      status: { value: selectedOption.value, label: selectedOption.label },
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prevProps) => ({
      ...prevProps,
      description: e.target.value,
    }));
  };

  const handleCloseForm = () => {
    reset();
    setShowForm(false);
  };

  const getCustomerData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/customer`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setCustomerData(response.data);
    } catch (err) {
      console.log(err, "Error fetching Customer Data");
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setProductData(response.data);
    } catch (err) {
      console.log(err, "Error fetching Customer Data");
    }
  };

  const handleCreateOrder = async (formData) => {
    try {
      // Handle form submission logic here
      console.log("Order created with data:", formData);

      const currentLocation = await getLocation();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/purchase-order`,
        {
          customer_id: formData?.customer_id,
          user_id: "7c5ff3fa-dd39-4675-8624-d11f62db88d5",
          loc_lat: currentLocation.latitude,
          loc_lon: currentLocation.longitude,
          order_entries: formData?.order_entries,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response) {
        toast.success("Purchase Order Created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      fetchData();

      setCreateShowForm(false);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="app-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* Sidebar */}
      <Sidebar />
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Purchase Orders</h1>
          <button className="mode-switch" title="Switch Theme">
            <svg
              className="moon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <button
            className="app-content-headerButton"
            onClick={() => setCreateShowForm(true)}
          >
            Add Order
          </button>
        </div>
        {/* search and filter functionality */}
        <SearchFilter />

        {/* Popup Form */}
        {showForm && (
          <div className="popup-form-overlay">
            <div className="popup-form">
              <button className="close-btn" onClick={handleCloseForm}>
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
              <h2>Edit Order</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-control">
                  <label>Status</label>
                  <Select
                    name="status"
                    defaultValue={{
                      value: formData.status.value,
                      label: formData.status.label,
                    }}
                    onChange={handleInputChange}
                    value={formData.status}
                    options={options}
                    styles={{
                      control: (baseStyles, { isFocused, isSelected }) => ({
                        ...baseStyles,
                        border: "1px solid #556877",
                        borderRadius: "5px",
                        boxShadow: "none",
                        backgroundColor: "#1D293D",
                        textColor: "white",
                        ":hover": {
                          border: "1px solid #556877",
                          borderRadius: "5px",
                        },
                      }),
                      indicatorSeparator: (base) => ({
                        display: "none",
                      }),
                      singleValue: (baseStyles, { isDisabled }) => ({
                        ...baseStyles,
                        color: isDisabled ? "#9BA6B2" : "white",
                      }),
                    }}
                  />
                  {errors.status && (
                    <span className="error-message">Status is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label>Description</label>
                  <textarea
                    name="description"
                    {...register("description", { required: true })}
                    rows="10"
                    className="description-field"
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                  ></textarea>
                  {errors.description && (
                    <span className="error-message">
                      Description is required
                    </span>
                  )}
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Update
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showCreateForm && (
          <CustomerOrderForm
            products={productData.map(({ id, name }) => {
              return { id, name };
            })}
            customers={customerData.map(({ name, id }) => {
              return { label: name, value: id };
            })}
            onSubmit={handleCreateOrder}
            onCancel={() => {
              setCreateShowForm(false);
            }}
          />
        )}
        <div
          className="products-area-wrapper tableView"
          style={{ overflowY: "auto" }}
        >
          <div className="products-header">
            <div className="product-cell image">
              Order#
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              Created at
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              Updated at
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell status-cell">
              Status
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell sales">
              Location
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell stock">
              Customer
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              Products
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              Weight (kg)
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              History
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              Delivery attempts
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              Delivery Preference
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            {/* <div className="product-cell price">
              Locker
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div> */}
            <div className="product-cell price">
              Actions
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="table-body">
            {Array.isArray(responseData)
              ? responseData?.map((item, index) => (
                  <div className="products-row" key={index}>
                    <div className="product-cell image">{index + 1}</div>
                    <div className="product-cell category">
                      <span className="cell-label"></span>
                      {formatDateTime(item.created_at)}
                    </div>
                    <div className="product-cell status-cell">
                      <span className="cell-label"></span>
                      {formatDateTime(item.updated_at)}
                    </div>
                    <div className="product-cell sales">
                      <span className="cell-label"></span>
                      {trimStatus(item.status)}
                    </div>
                    <div className="product-cell stock">
                      <span className="cell-label"></span>
                      <Link
                        to={`/maps/${item.loc_lat}/${item.loc_lon}`}
                        target="_blank"
                      >
                        <div
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          view location
                        </div>
                      </Link>
                    </div>
                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      <Link to={`/purchase-orders/customer/${item.id}`}>
                        <div
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          {item.customer.name}
                        </div>
                      </Link>
                    </div>
                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      <Link to={`/purchase-orders/products/${item.id}`}>
                        <div
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          Products({item.order_entries?.length ?? 0})
                        </div>
                      </Link>
                    </div>
                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      {item.total_weight}
                    </div>
                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      <Link to={`/purchase-orders/history/${item.id}`}>
                        <div
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          History({item.order_history?.length ?? 0})
                        </div>
                      </Link>
                    </div>

                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      {item.delivery_attempts}
                    </div>
                    <div className="product-cell price">
                      <span className="cell-label"></span>
                      {item?.preference ? (
                        <Link to={`/purchase-orders/preference/${item.id}`}>
                          <div
                            style={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                          >
                            view preference
                          </div>
                        </Link>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                    {/* <div className="product-cell price">
                    {item.is_locker_used ? (
                      <Link to={`/lockers/${item.locker.id}`}>
                        <div
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          view locker
                        </div>
                      </Link>
                    ) : (
                      <div> - </div>
                    )}
                  </div> */}
                    <div
                      className="product-cell price"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <img
                        src="./Group.svg"
                        alt="edit icon"
                        style={{ width: "20%", cursor: "pointer" }}
                        onClick={() => onEditClick(item.id)}
                      />
                      {/* <img
                      src="./delete.svg"
                      alt="edit icon"
                      style={{ width: "15%", cursor: "pointer" }}
                      onClick={() => onEditClick(item.id)}
                    /> */}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
