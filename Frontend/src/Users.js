import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SearchFilter from "./SearchFilter";
import { formatDateTime, trimStatus } from "./shared/helper";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { TextField } from "@mui/material";
import Select from "react-select";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Users = () => {
  const [responseData, setResponseData] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    reset,
    control,
  } = useForm();

  // Role error message
  const roleErrorMessage = errors.role && (
    <span className="error-message">Role is required</span>
  );

  // Name error message
  const nameErrorMessage = errors.name && (
    <span className="error-message">Name is required</span>
  );

  // Email error message
  const emailErrorMessage = errors.email && (
    <span className="error-message">Email is required</span>
  );

  // Mobile error message
  const mobileErrorMessage = errors.mobile && (
    <span className="error-message">
      {errors.mobile.type === "required" && "Mobile is required"}
      {errors.mobile.type === "minLength" && "Mobile number must be 10 digits"}
      {errors.mobile.type === "maxLength" && "Mobile number must be 10 digits"}
    </span>
  );

  // Password error message
  const passwordErrorMessage = errors.password && (
    <span className="error-message">Password is required</span>
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showUserForm]);

  const RegisterUserApi = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
        {
          name: formData?.name,
          email: formData?.email,
          mobile: formData?.mobile,
          password: formData?.password,
          role: formData?.role.value,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.data) {
        toast.success("User Registered Successfully", {
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

  const onSubmit = (data) => {
    console.log(data);
    setShowUserForm(false);
    RegisterUserApi(data);
    reset();
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "inventory_manager", label: "Inventory Manager" },
    { value: "logistics_manager", label: "Logistics Manager" },
    { value: "delivery_person", label: "Delivery Person" },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
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
      <Sidebar />
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Users</h1>
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
            onClick={() => setShowUserForm(true)}
          >
            Register User
          </button>
        </div>
        {/* search and filter functionality */}
        <SearchFilter />
        {showUserForm && (
          <div
            className="popup-form-overlay"
            style={{
              overflowY: "auto",
              maxHeight: "100vh",
              width: "100%",
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#888 transparent", // For Firefox
              "&::-webkit-scrollbar": {
                width: "6px", // Width of the scrollbar
                height: "6px", // Height of the scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888", // Color of the scrollbar thumb
                borderRadius: "3px", // Rounded corners of the scrollbar thumb
              },
            }}
          >
            <div
              className="popup-form"
              style={{
                overflowY: "auto",
                maxHeight: "100vh",
                width: "100%",
              }}
            >
              <button
                className="close-btn"
                onClick={() => {
                  setShowUserForm(false);
                  setShowPassword(false);
                  reset();
                }}
              >
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
              <h2>Register User</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                {/* Role field */}
                <div className="form-control">
                  <label>Role</label>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options}
                        placeholder="Select Role"
                      />
                    )}
                  />
                  {roleErrorMessage}
                </div>
                {/* Name field */}
                <div className="form-control">
                  <label>Name</label>
                  <TextField
                    sx={{
                      color: "black",
                      background: "white",
                      borderRadius: "5px",
                    }}
                    placeholder="User Name"
                    {...register("name", { required: true })}
                    fullWidth
                    error={errors.name}
                  />
                  {nameErrorMessage}
                </div>
                {/* Email field */}
                <div className="form-control">
                  <label>Email</label>
                  <TextField
                    sx={{
                      color: "black",
                      background: "white",
                      borderRadius: "5px",
                    }}
                    placeholder="User Email"
                    type="email"
                    {...register("email", { required: true })}
                    fullWidth
                    error={errors.email}
                  />
                  {emailErrorMessage}
                </div>
                {/* Mobile field */}
                <div className="form-control">
                  <label>Mobile</label>
                  <TextField
                    sx={{
                      color: "black",
                      background: "white",
                      borderRadius: "5px",
                    }}
                    placeholder="User Mobile"
                    type="number"
                    {...register("mobile", {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
                    fullWidth
                    error={errors.mobile}
                  />
                  {mobileErrorMessage}
                </div>
                {/* Password field */}
                <div className="form-control">
                  <label>Password</label>
                  <TextField
                    sx={{
                      color: "black",
                      background: "white",
                      borderRadius: "5px",
                    }}
                    placeholder="User Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    fullWidth
                    error={errors.password}
                    InputProps={{
                      endAdornment: showPassword ? (
                        <Visibility
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOff
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                      ),
                    }}
                  />
                  {passwordErrorMessage}
                </div>
                {/* Form actions */}
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowUserForm(false);
                      setShowPassword(false);
                      reset();
                    }}
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
              User #
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
            <div className="product-cell image">
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
            <div className="product-cell status-cell">
              Name
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
              Email
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
              Mobile
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
              Role
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
              Associated orders
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
          {Array.isArray(responseData)
            ? responseData?.map((item, index) => (
                <div className="products-row" key={index}>
                  <button className="cell-more-button">
                    {/* More button SVG */}
                  </button>
                  <div className="product-cell image">{index + 1}</div>
                  <div className="product-cell category">
                    <span className="cell-label"></span>
                    {formatDateTime(item.created_at)}
                  </div>
                  <div className="product-cell status-cell">
                    <span className="cell-label"></span>
                    {item.name}
                  </div>
                  <div className="product-cell sales">
                    <span className="cell-label"></span>
                    {item.email}
                  </div>
                  <div className="product-cell stock">
                    <span className="cell-label"></span>
                    {item.mobile}
                  </div>
                  <div className="product-cell stock">
                    <span className="cell-label"></span>
                    {trimStatus(item.role)}
                  </div>
                  <div className="product-cell stock">
                    <Link to={`/purchase-orders/${item.id}`}>
                      <div
                        style={{
                          color: "white",
                          textDecoration: "underline",
                        }}
                      >
                        orders({item._count.orders})
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Users;
