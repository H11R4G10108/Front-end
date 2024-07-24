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
import { useLocation } from "react-router-dom";

export default function navbar() {
  const [searchString, setSearchString] = useState("");
  const { getCartSize } = useContext(CartContext);
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decoded = jwtDecode(token);
    var username = decoded.username;
  }
  const searchProduct = (e) => {
    e.preventDefault();
    window.location.href = "/search-products/" + searchString;
  };
  let location = useLocation();
  const excludedPaths = ["/cart/", "/user/", "/user/order","/user/address","/change-password/","/about/privacy-policy/","/about/term-of-service", "/about/FAQ","/user/login/","/user/register/"];
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
        <a
          href="/category/Men"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Men
          </p>
        </a>
        <a
          href="/category/Women"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Women
          </p>
        </a>
        <a
          href="/category/Kid"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Kid
          </p>
        </a>
      </div>
      <div className="flex gap-8">
        {/* SEARCH FUNCTION */}

        {!excludedPaths.includes(location.pathname) ? (
          <form
            className="max-w-sm flex"
            id="search_form"
            onSubmit={searchProduct}
          >
            <input
              type="text"
              id="search"
              className="block w-4/6 p-2 text-sm text-gray-900 border border-r-0"
              placeholder="Search by product ..."
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button
              onClick={searchProduct}
              type="button"
              className="border border-gray-300 end-2.5 bottom-2.5 px-4 py-2 border-l-0"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </button>
          </form>
        ) : (
          <form
            className="max-w-md mx-auto flex invisible"
            id="search_form"
            onSubmit={searchProduct}
          >
            <input
              type="text"
              id="search"
              className="block w-full p-3 text-sm text-gray-900 border border-r-0"
              placeholder="Search by product title..."
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button
              onClick={searchProduct}
              type="button"
              className="border border-gray-300 end-2.5 bottom-2.5 px-4 py-2 border-l-0"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-900" />
            </button>
          </form>
        )}
        {/* CART */}
        <div className="flex items-center">
          <a href="/cart/" className="flex relative mx-auto">
            <ShoppingCartIcon className="h-5 w-5 text-black-0" />
            {getCartSize() > 0 ? (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-6">
                {getCartSize()}
              </div>
            ) : null}
          </a>
        </div>
        {token !== null && (
          <div id="dropdown" className="flex items-center">
            <a className="flex gap-2" href="/user/">
              <UserIcon className="h-5 w-5 text-black-0 cursor-pointer" />{" "}
              {username}
            </a>
          </div>
        )}
        {token === null && (
          <div className="flex items-center">
            <a href="/user/login/" className="px-4 py-2 w-full text-black ">
              Sign in
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
