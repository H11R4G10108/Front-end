import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { CartContext } from "../../context/CartProvider";
import "./Productdetail.css";

const Productdetail = () => {
  const { cartItems, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  //handle increment
  const incrementHandle = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  const decrementHandle = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/product/" + id
      );
      setProduct(response.data);
      setLoading(false);
    };
    loadProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-10">
        <div className="flex items-center justify-center gap-28 ">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="flex-none relative w-4/12"
          />
          <div className="p-6">
            <div className="flex flex-col gap-2">
              <h1 className="flex-auto text-5xl font-semibold text-gray-900">
                {product.name}
              </h1>
              {product.category && (
                <p className="text-xm text-gray-500">
                  Category: {product.category.category}
                </p>
              )}
              <div>
                {product.category && <div>Size: {product.size.size}</div>}
              </div>
              <div className="text-3xl text-black-500 mt-4">
                ${product.price}
              </div>
              <div className="flex mt-1 mb-4 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm"></div>
              </div>
              <div id="button-cont">
                <button
                  className="h-10 px-6 font-semibold border border-black-800 text-black hover:bg-black hover:text-white"
                  onClick={decrementHandle}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  className="h-10 px-6 font-semibold border border-black-800  text-black hover:bg-black hover:text-white"
                  onClick={incrementHandle}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="h-10 px-10 w-full mt-5 font-semibold border border-black-800 text-gray-50 bg-gray-900 hover:bg-gray-700 "
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Productdetail;
