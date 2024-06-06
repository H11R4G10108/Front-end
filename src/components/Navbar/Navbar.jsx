import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Productpage from "../../components/ProductPage/Productpage";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";

export default function navbar() {
  return (
    <div className="flex flex-row px-5 items-center justify-between">
      <a href="#">
        <img src={logo} alt="american apparel" className="w-32" />
      </a>
      <div className="flex gap-20">
        <Link
          to={"/"}
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Home
          </p>
        </Link>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            For Men
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            For Women
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            For Unisex Folks
          </p>
        </a>
      </div>
      <div className="flex gap-10">
        <a href="#">
          <MagnifyingGlassIcon className="h-5 w-5 text-black-0" href="#" />
        </a>
        <a href="#">
          <ShoppingCartIcon className="h-5 w-5 text-black-0" href="#" />
        </a>
        <a href="#">
          <UserIcon className="h-5 w-5 text-black-0" href="#" />
        </a>
      </div>

      <Routes>
        <Route path="/" element={<Productpage />} />
      </Routes>
    </div>
  );
}
