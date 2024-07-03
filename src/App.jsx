import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Productdetail from "./components/ProductPage/Productdetail";
import React from "react";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import Accountpage from "./components/AccountPage/Accountpage";
import Register from "./components/Login/Register";
import SearchResult from "./components/Navbar/SearchResult";


export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/user/login/" element={<Login />} />
          <Route path="/user/" element={<Accountpage />} />
          <Route path="/user/register/" element={<Register />} />
          <Route path="/search-products/:searchstring" element={<SearchResult />} />

        </Routes>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
