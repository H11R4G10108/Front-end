import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Productdetail from "./components/ProductPage/Productdetail";
import CategoryPage from "./components/ProductPage/CategoryPage";
import React from "react";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ConfirmOrder from "./components/Checkout/ConfirmOrder";
import { CartProvider } from "./context/CartProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/Login/Login";
import OrderList from "./components/AccountPage/OrderList";
import Accountpage from "./components/AccountPage/Accountpage";
import ChangePassword from "./components/AccountPage/ChangePassword";
import Register from "./components/Login/Register";
import Address from "./components/AccountPage/Address";
import AddAddress from "./components/AccountPage/AddAddress";
import UpdateAddress from "./components/AccountPage/UpdateAddress";
import SearchResult from "./components/Navbar/SearchResult";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import EditOrder from "./components/Checkout/EditOrder.jsx";
import Policy from "./components/Footer/Policy.jsx";
import TOS from "./components/Footer/TOS.jsx";
import FAQ from "./components/Footer/FAQ.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Productdetail />} />\
            <Route path="/category/:searchstring" element={<CategoryPage />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="about/privacy-policy/" element={<Policy />} />
            <Route path="/about/term-of-service" element={<TOS />} />
            <Route path="/about/FAQ" element={<FAQ />} />
            <Route
              path="/search-products/:searchstring"
              element={<SearchResult />}
            />
            <Route path="/user/login/" element={<Login />} />
            <Route
              path="/user/"
              element={
                <PrivateRoute>
                  <Accountpage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/address"
              element={
                <PrivateRoute>
                  <Address />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/address/:id"
              element={
                <PrivateRoute>
                  <UpdateAddress />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/add-address"
              element={
                <PrivateRoute>
                  <AddAddress />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/order-detail/:id"
              element={
                <PrivateRoute>
                  <ConfirmOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/order"
              element={
                <PrivateRoute>
                  <OrderList />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-order/:order_id"
              element={
                <PrivateRoute>
                  <EditOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
            <Route path="/user/register/" element={<Register />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
