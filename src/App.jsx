import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Productdetail from "./components/ProductPage/Productdetail";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Productdetail />} />
      </Routes>
    </ThemeProvider>
  );
}
