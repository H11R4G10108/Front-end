import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Productpage from "./components/Productpage/Productpage";
import Slider from "./components/Slider/Slider";

import { Button } from "@material-tailwind/react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <Productpage />
    </div>
  );
}

export default App;
