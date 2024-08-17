import React from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handledata = async (data) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
      const credentials = {
        email: data.Username,
        password: data.Password,
      };

      const response = await axios.post(url, credentials, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (response.data) {
        navigate("/");

        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
          token: response.data.token,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
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

  return (
    <center>
      <div className="login-wrap ourcss">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
            Login
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div className="sign-in-htm">
              <form onSubmit={handleSubmit((data) => handledata(data))}>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    {...register("Username")}
                    id="user"
                    type="text"
                    className="input"
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    {...register("Password")}
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                  />
                </div>
                <div className="group">
                  <input
                    id="check"
                    type="checkbox"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="check">
                    <span className="icon"></span> Keep me Signed in
                  </label>
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Sign In" />
                </div>
              </form>
              <div className="hr"></div>
              {/* <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div> */}
            </div>
            {/* <div className="sign-up-htm">
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </center>
  );
};

export default Login;
