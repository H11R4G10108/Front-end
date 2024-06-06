import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Productpage from "./components/ProductPage/Productpage";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Productpage />
      </div>
    </ThemeProvider>
  );
}

export default App;
