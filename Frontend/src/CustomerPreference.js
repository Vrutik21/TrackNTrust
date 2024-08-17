import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d283c",
    },
    text: {
      primary: "#000000",
    },
  },
});

const timeOptions = [
  { label: "8:00 AM to 10:00 AM", value: "8:00-10:00" },
  { label: "10:00 AM to 12:00 PM", value: "10:00-12:00" },
  { label: "12:00 PM to 2:00 PM", value: "12:00-14:00" },
  { label: "2:00 PM to 4:00 PM", value: "14:00-16:00" },
];

const CustomerPreference = () => {
  const { handleSubmit, control, reset } = useForm();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState();
  const [showThanks, setShowThanks] = useState(false);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/purchase-order/${orderId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setOrderData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err, "Failed to fetch order details");
    }
  };

  const upsertCustomerPreference = async (timeRange, preferredDate) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/customer/set-preference/${orderId}`,
        {
          delivery_time: timeRange,
          delivery_date: preferredDate,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log(response.data);

      if (response.data) {
        toast.success("Customer Preference Added", {
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

        setShowThanks(true);
      }
    } catch (err) {
      console.log(
        err.response.data.message,
        "Error creating customer preferences"
      );
      toast.error("Delivery time and date is required", {
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

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(new Date(data.preferredDate).toISOString());
    reset();
    upsertCustomerPreference(data.timeRange, data.preferredDate);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "100vh",
        width: "100%",
      }}
    >
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
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="md"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Paper
              elevation={3}
              style={{
                background: "white",
                borderRadius: "15px",
                width: "100%",
              }}
            >
              <Box p={3}>
                {!showThanks && (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Set Your Delivery Preference
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      style={{ marginBottom: "20px" }}
                    >
                      Hello {orderData?.customer.name}, We made two delivery
                      attempts to your location but failed to deliver it. You
                      can set your preference for the next delivery for your
                      order #{orderData?.order_code}.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid
                        container
                        spacing={5}
                        direction="column"
                        justifyItems={"center"}
                        alignContent={"center"}
                      >
                        <Grid item>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="time-range-label">
                              Preferred Time Range
                            </InputLabel>
                            <Controller
                              name="timeRange"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  labelId="time-range-label"
                                  label="Preferred Time Range"
                                >
                                  {timeOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <Controller
                            name="preferredDate"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  {...field}
                                  disablePast
                                  shouldDisableDate={(day) => {
                                    const today = dayjs();
                                    const maxDate15DaysLater = today.add(
                                      20,
                                      "day"
                                    );

                                    // Disable today and dates up to 2 days after today
                                    if (
                                      dayjs(day).isSame(
                                        today.add(2, "day"),
                                        "day"
                                      )
                                    ) {
                                      return true;
                                    }

                                    if (
                                      dayjs(day).isBefore(
                                        today.add(2, "day"),
                                        "day"
                                      )
                                    ) {
                                      return true;
                                    }

                                    // Enable dates up to 15 days after today
                                    if (
                                      dayjs(day).isBefore(
                                        maxDate15DaysLater,
                                        "day"
                                      )
                                    ) {
                                      return false;
                                    }

                                    // Disable all future dates after 15 days
                                    return true;
                                  }}
                                  // fullWidth
                                  label="Preferred Date"
                                  inputVariant="outlined"
                                  format="DD/MM/YYYY"
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                  style={{ color: blue[500] }}
                                />
                              </LocalizationProvider>
                            )}
                          />
                        </Grid>
                        <Grid item align="center">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "10px" }}
                          >
                            Submit
                          </Button>
                          <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={handleClear}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </>
                )}
                {showThanks && (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Delivery Preference Added for your Order.
                      {orderData?.order_code}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      style={{ marginBottom: "20px" }}
                    >
                      Thank you, {orderData?.customer.name}, your delivery
                      preference has been set and your Order #
                      {orderData?.order_code} will be delivered to you at your
                      desired time and date.
                    </Typography>
                  </>
                )}
              </Box>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CustomerPreference;
