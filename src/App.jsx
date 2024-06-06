import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Productpage from "./components/Productpage/Productpage";
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
