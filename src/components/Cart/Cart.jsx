import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import Navbar from "../../components/Navbar/Navbar";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    removeFromCartEntirely,
    getCartSubTotal,
  } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div>
      <Navbar />
      <div className="flex justify-center align-center">
        <div className="rounded-full bg-blue-100 p-3 ">
          <ShoppingCartIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-semibold text-gray-900 ml-3 mt-3">Cart</h1>
      </div>
      {cartItems.length > 0 ? (
        <div id="cont" className="flex flex-row justify-between px-10">
          <div
            id="cart"
            className="flex-col flex gap-8 p-10 text-black text-sm w-7/12"
          >
            <div className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <div
                  className="flex gap-40 items-center justify-between"
                  key={index}
                >
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="h-24" />
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
              <button
                className="px-4 py-2 bg-black text-white text-xm hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  clearCart();
                }}
              >
                Clear cart
              </button>
            </div>
          </div>
          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 dark:bg-gray-800 space-y-6 w-4/12">
            <div className="flex flex-col justify-between items-center gap-4">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white  text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base dark:text-gray-300  text-gray-600">
                    ${getCartSubTotal()}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white  text-gray-800">
                    Shipping
                  </p>
                  <p className="text-base dark:text-gray-300  text-gray-600">
                    $5
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold  text-gray-800">
                  Total
                </p>
                <p className="text-base dark:text-gray-300 font-semibold  text-gray-600">
                  ${getCartTotal()}
                </p>
              </div>
              <a
                href="/checkout/"
                className="px-4 py-2 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white text-center"
              >
                Proceed to checkout
              </a>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-lg text-center">Your cart is empty</h1>
      )}
    </div>
  );
}
