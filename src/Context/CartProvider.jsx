import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
import Swal from "sweetalert2";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item, quantity_input) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.productID === item.productID
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity + quantity_input }
            : cartItem
        )
      );
      Swal.fire({
        title: "Item added to cart",
        icon: "success",
        toast: true,
        timer: 1000,
        position: "top-right",
        timerProgressBar: true,
        showCloseButton: true,
        showConfirmButton: false,
      });
    } else {
      setCartItems([...cartItems, { ...item, quantity: quantity_input }]);
      Swal.fire({
        title: "Item added to cart",
        icon: "success",
        toast: true,
        timer: 1000,
        position: "top-right",
        timerProgressBar: true,
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.productID === item.productID
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.productID !== item.productID)
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const removeFromCartEntirely = (item) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.productID !== item.productID)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const getCartSubTotal = () => {
    return calculateCartTotal(cartItems);
  };
  
  const getCartTotal = () => {
    const subTotal = calculateCartTotal(cartItems);
    const additionalCharge = 5; // Example additional charge, like shipping fee
    return subTotal + additionalCharge;
  };
  const getCartSize = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartSubTotal,
        getCartTotal,
        getCartSize,
        removeFromCartEntirely,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
