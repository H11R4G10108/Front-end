import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Productdetail from "./components/ProductPage/Productdetail";
import React, { useState, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./Context/CartProvider";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/cart/" element={<Cart />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}
