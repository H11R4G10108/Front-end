import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Home />
      </div>
      <Routes>
        <Route exact path="/home" component={Home} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
