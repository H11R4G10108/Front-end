import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
export default function navbar() {
  const [searchString, setSearchString ] = useState("");
  const { getCartSize } = useContext(CartContext);
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decoded = jwtDecode(token);
    var username = decoded.username;
  };
  const searchProduct =()=>{
    window.location.href='/search-products/' +searchString
  }
  return (

    <div className="flex flex-row px-5 items-center justify-between sticky top-0 bg-white">
      <a href="/">
        <img src={logo} alt="american apparel" className="w-32" />
      </a>
      <div className="flex gap-20">
        <a href="/" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Home
          </p>
        </a>
        <a href="/" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Men
          </p>
        </a>
        <a href="/" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Women
          </p>
        </a>
        <a href="/" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Kid
          </p>
        </a>
      </div>
      <div className="flex gap-10">
        {/* SEARCH FUNCTION */}
        <form className="max-w-md mx-auto flex" id="search">
            <input type="search" id="search" className="block w-full p-3 text-sm text-gray-900 border border-gray-300 bg-gray-50" placeholder="Search by product title..." onChange={(e) => setSearchString(e.target.value)}
            />
            <button onClick={searchProduct} type="button" className=" end-2.5 bottom-2.5 bg-black-900 font-medium text-sm px-4 py-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-black-0" />
            </button>
        </form>
        {/* CART */}
        <div className="flex items-center">
          <a href="/cart/" className="flex relative mx-auto">
            <ShoppingCartIcon className="h-5 w-5 text-black-0" />
            {getCartSize() > 0 ? (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-6 dark:border-gray-900">
                {getCartSize()}
              </div>
            ) : null}
          </a>
        </div>
        {token !== null && (
          <div id="dropdown" className="flex items-center">
            <div className="flex gap-2">
              <UserIcon className="h-5 w-5 text-black-0 cursor-pointer" /> {username}
            </div>
            <div id="dropdown-content">
              <a href="/user/">Account</a>
              <a onClick={logoutUser}>
                Logout
              </a>
            </div>
          </div>

        )}
      {token === null && (
        <div className="flex items-center">
          <a href="/user/login/" className="px-4 py-2 w-full text-black ">Login</a>
        </div>
      )}
    </div>
    </div >
  );
}
