import React, { useEffect, useState } from "react";
import { formatDateTime, trimStatus } from "./shared/helper";
import Sidebar from "./Sidebar";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuth from "./shared/userAuth";

const PurchaseOrderDetail = () => {
  const [responseData, setResponseData] = useState();
  let { id, customerId } = useParams();
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const [orderData, setOrderData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: orderData.id || "",
    status: { value: "", label: "" },
    description: "",
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    fetchData();
  }, [id, isAuthenticated]);

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
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const options = [
    { value: "initiated", label: "Initiated" },
    { value: "in_progress", label: "In Progress" },
    { value: "in_transit", label: "In Transit" },
    { value: "reached_facility", label: "Reached Facility" },
    { value: "ready_for_dispatch", label: "Ready For Dispatch" },
    { value: "out_for_delivery", label: "Out For Delivery" },
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

  return (
    <div className="app-container">
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
          <button className="app-content-headerButton">Add Order</button>
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
        <div className="products-area-wrapper tableView">
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
            </div>
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
          {responseData && (
            <div className="products-row" key={0}>
              <div className="product-cell category">
                <span className="cell-label"></span>
                {formatDateTime(responseData.created_at)}
              </div>
              <div className="product-cell status-cell">
                <span className="cell-label"></span>
                {formatDateTime(responseData.updated_at)}
              </div>
              <div className="product-cell sales">
                <span className="cell-label"></span>
                {trimStatus(responseData.status)}
              </div>
              <div className="product-cell stock">
                <span className="cell-label"></span>
                <Link
                  to={`/maps/${responseData.loc_lat}/${responseData.loc_lon}`}
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
                <Link to={`/purchase-orders/customer/${responseData.id}`}>
                  <div style={{ color: "white", textDecoration: "underline" }}>
                    {responseData.customer.name}
                  </div>
                </Link>
              </div>
              <div className="product-cell price">
                <span className="cell-label"></span>
                <Link to={`/purchase-orders/products/${responseData.id}`}>
                  <div style={{ color: "white", textDecoration: "underline" }}>
                    Products({responseData.order_entries.length})
                  </div>
                </Link>
              </div>
              <div className="product-cell price">
                <span className="cell-label"></span>
                {responseData.total_weight}
              </div>
              <div className="product-cell price">
                <span className="cell-label"></span>
                <Link to={`/purchase-orders/history/${responseData.id}`}>
                  <div style={{ color: "white", textDecoration: "underline" }}>
                    History({responseData.order_history.length})
                  </div>
                </Link>
              </div>
              <div className="product-cell price">
                <span className="cell-label"></span>
                {responseData.delivery_attempts}
              </div>
              <div className="product-cell price">
                {responseData.is_locker_used ? (
                  <Link to={`/lockers/${responseData.locker.id}`}>
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
              </div>
              <div className="product-cell price">
                <img
                  src="./Group.svg"
                  alt="edit icon"
                  style={{ width: "20%", cursor: "pointer" }}
                  onClick={() => onEditClick(responseData.id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
