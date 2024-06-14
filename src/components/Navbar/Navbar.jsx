import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import { Routes, Route, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartProvider";
import { useContext, useEffect, useState } from "react";

export default function navbar() {
  const { getCartSize } = useContext(CartContext);
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
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Men
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Women
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-sm">
            Kid
          </p>
        </a>
      </div>
      <div className="flex gap-10">
        <a href="#">
          <MagnifyingGlassIcon className="h-5 w-5 text-black-0" href="#" />
        </a>
        <a href="/cart/" className="flex relative">
          <ShoppingCartIcon className="h-5 w-5 text-black-0 " href="#" />
          {getCartSize() > 0 ? (
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-6 dark:border-gray-900">
              {getCartSize()}
            </div>
          ) : null}
        </a>
        <a href="#">
          <UserIcon className="h-5 w-5 text-black-0" href="#" />
        </a>
      </div>
    </div>
  );
}
