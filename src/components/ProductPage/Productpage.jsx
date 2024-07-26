import { useContext, useEffect, useState } from "react";
import "./Productpage.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";
import { SparklesIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/product/"
      );
      setProduct(response.data);
      setLoading(false);
    };
    loadProduct();
  }, []);
  return (
    <div>
      {loading ? (
        <div
          id="loading-overlay"
          class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60"
        >
          <svg
            class="animate-spin h-8 w-8 text-white mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-white text-3xl font-bold">Loading...</span>
        </div>
      ) : (
        <div>
         <div className="flex pl-28">
        <div className="rounded-full bg-blue-100 p-3 ">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 ml-3 mt-3">All Products</h1>
      </div>
      
        <div className="gap-16 grid grid-cols-4 px-28 pt-5">
          {products &&
            products.map((product, index) => (
              <div id="product-list" className="shadow-lg " key={index}>
                <Link to={`/product/${product.productID}`}>
                  <img
                    src={product.image}
                    alt="Product Image"
                    className="w-full mb-2 "
                  />
                  <div id="product-content" className="p-2 leading-5">
                    <h2 className="font-bold mb-1 text-xm">{product.name}</h2>
                    <p className="mb-2">${product.price}</p>
                  </div>
                </Link>
                <div className="mb-2">
                  <span className="p-2 leading-5 group transition-all duration-300 ease-in-out text-white">
                    <button
                      className="bg-white border border-gray-400 border-solid text-black p-1 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-[length:0%] bg-no-repeat group-hover:bg-[length:100%] transition-all duration-500 ease-out"
                      onClick={() => addToCart(product, 1)}
                    >
                      Quick add <span className="text-xl">+</span>
                    </button>
                  </span>
                </div>
              </div>
            ))}
        </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;
