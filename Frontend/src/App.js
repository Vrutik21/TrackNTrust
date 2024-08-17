// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./style.scss";
import ProductDetails from "./ProductDetail";
import OrderHistory from "./OrderHistory";
import OrderProducts from "./OrderProducts";
import PurchaseOrder from "./PurchaseOrder";
import Customer from "./Customer";
import CustomerDetail from "./CustomerDetail";
import Locker from "./Locker";
import PurchaseOrderDetail from "./PurchaseOrderDetail";
import LockerDetail from "./LockerDetail";
import MapComponent from "./MapsGoogle";
import CustomerPreference from "./CustomerPreference";
import Login from "./Login";
import Users from "./Users";
import OrderPreference from "./OrderPreference";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/purchase-orders/:userId?" element={<PurchaseOrder />} />
        <Route path="/purchase-orders/:id" element={<PurchaseOrderDetail />} />
        <Route
          path="/purchase-orders/preference/:orderId?"
          element={<OrderPreference />}
        />
        <Route
          path="/customers/:customerId/orders"
          element={<PurchaseOrder />}
        />
        <Route
          path="/purchase-orders/products/:id"
          element={<OrderProducts />}
        />
        <Route path="/purchase-orders/history/:id" element={<OrderHistory />} />
        <Route
          path="/purchase-orders/customer/:id"
          element={<CustomerDetail />}
        />
        <Route path="/customers" element={<Customer />} />
        <Route path="/lockers" element={<Locker />} />
        <Route path="/lockers/:id" element={<LockerDetail />} />
        <Route
          path="/maps/:latitude/:longitude/:radius?"
          element={<MapComponent />}
        />
        <Route
          path="/customer/preference/:orderId"
          element={<CustomerPreference />}
        />
      </Routes>
    </Router>
  );
}

export default App;
