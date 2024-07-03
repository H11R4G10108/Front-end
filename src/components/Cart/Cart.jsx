import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import Navbar from "../../components/Navbar/Navbar";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    removeFromCartEntirely,
  } = useContext(CartContext);

  return (
    <div>
      <Navbar />
      <h1 className="flex-auto text-5xl font-semibold text-gray-900 p-10">
        Cart & Checkout
      </h1>
      <div id="cont" className="flex flex-row justify-between">
        <div
          id="cart"
          className="flex-col flex gap-8 p-10 text-black text-sm bg-gray-50 w-7/12"
        >
          <div className="flex flex-col gap-4">
            {cartItems.map((item, index) => (
              <div
                className="flex gap-40 items-center justify-between "
                key={index}
              >
                <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className=" h-24" />
                  <div className="flex flex-col">
                    <Link to={`/product/${item.productID}`}>
                      <h1 className="text-lg font-bold hover:text-gray-700">
                        {item.name}
                      </h1>
                    </Link>
                    <p className="text-gray-600">${item.price}</p>
                    <TrashIcon
                      className="h-5 w-5 text-gray-0 mt-4 cursor-pointer"
                      onClick={() => {
                        removeFromCartEntirely(item);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="h-10 px-6 font-semibold border border-black-800  text-black hover:bg-black hover:text-white"
                    onClick={() => {
                      removeFromCart(item);
                    }}
                  >
                    -
                  </button>
                  <span className="p-2">{item.quantity}</span>
                  <button
                    className="h-10 px-6 font-semibold border border-black-800  text-black hover:bg-black hover:text-white"
                    onClick={() => {
                      addToCart(item, 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length > 0 && (
              <button
                className="px-4 py-2 bg-black text-white text-xm hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  clearCart();
                }}
              >
                Clear cart
              </button>
            )}
          </div>
        </div>
        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 bg-gray-50 dark:bg-gray-800 space-y-6 w-4/12">
          {cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center gap-4">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div class="flex justify-center items-center w-full flex-col border-gray-200 border-b pb-4">
                <div class="flex justify-between w-full">
                  <p class="text-base dark:text-white  text-gray-800">
                    Subtotal
                  </p>
                  <p class="text-base dark:text-gray-300  text-gray-600">
                    ${getCartTotal()}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white  text-gray-800">
                    Shipping
                  </p>
                  <p class="text-base dark:text-gray-300  text-gray-600">$0</p>
                </div>
              </div>
              <div class="flex justify-between items-center w-full">
                <p class="text-base dark:text-white font-semibold  text-gray-800">
                  Total
                </p>
                <p class="text-base dark:text-gray-300 font-semibold  text-gray-600">
                  ${getCartTotal()}
                </p>
              </div>
              <button className="px-4 py-2 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white">
                Proceed to checkout
              </button>
            </div>
          ) : (
            <h1 className="text-lg">Your cart is empty</h1>
          )}
        </div>
      </div>
    </div>
  );
}
