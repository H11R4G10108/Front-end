import React from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import Navbar from "../../components/Navbar/Navbar";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <>
      <Navbar />
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        <h1 className="flex-auto text-5xl font-semibold text-gray-900">Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <div className="flex justify-between items-center" key={index}>
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-md h-24"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.name}</h1>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item, 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                clearCart();
              }}
            >
              Clear cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg">Your cart is empty</h1>
        )}
      </div>
    </>
  );
}
