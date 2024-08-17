import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userData = localStorage.getItem("userData");
        console.log(JSON.parse(userData), "userData");

        if (!userData || !JSON.parse(userData).token) {
          setAuthenticated(false);
          return;
        }

        // Verify user token
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/verify`,
          {
            headers: {
              token: JSON.parse(userData).token,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (response.data) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }

        console.log(authenticated, "response");
      } catch (error) {
        console.error("Error verifying user token:", error);
        // If any error occurs, set authenticated to false
        setAuthenticated(false);
      }
    };
    checkUserToken();
  }, []);

  console.log(authenticated, "auth");

  return authenticated;
};

export default useAuth;
