import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <div className="flex flex-row px-5 items-center justify-between">
      <Link href="#">
        <img src={logo} alt="american apparel" className="w-40" />
      </Link>
      <div className="flex gap-20">
        <Link
          href="#"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            Home
          </p>
        </Link>
        <Link
          href="#"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Men
          </p>
        </Link>
        <Link
          href="#"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Women
          </p>
        </Link>
        <Link
          href="#"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Unisex Folks
          </p>
        </Link>
      </div>
      <div className="flex gap-10">
        <a href="#">
          <MagnifyingGlassIcon className="h-6 w-6 text-black-0" href="#" />
        </a>
        <Link href="#">
          <ShoppingCartIcon className="h-6 w-6 text-black-0" href="#" />
        </Link>
        <Link href="#">
          <UserIcon className="h-6 w-6 text-black-0" href="#" />
        </Link>
      </div>
    </div>
  );
}
