import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Productpage from "./components/Productpage/Productpage";

import { Button } from "@material-tailwind/react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Productpage />
    </div>
  );
}

export default App;
