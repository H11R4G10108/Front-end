import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SearchResult.css";
import Navbar from "../../components/Navbar/Navbar";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../../context/CartProvider";
import { useContext } from "react";

function SearchResult() {
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);
  const baseUrl = "http://127.0.0.1:8000/api";
  const [products, setProduct] = useState([]);
  const [productrec, setProductRec] = useState([]);
  const { searchstring } = useParams();
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const response = await axios.get(
        baseUrl + "/product/?search=" + searchstring
      );
      setProduct(response.data);
      setLoading(false);
    };
    loadProduct();
  }, []);
  useEffect(() => {
    axios.get(baseUrl + "/product/")
      .then(response => {
        const limitedProducts = response.data.slice(0, 8);
        setProductRec(limitedProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  return (
    <div>
      <Navbar />
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
        <div className="mb-10">
          {products.length > 0 ? (
            <div>
              <h1 className="py-0.5 px-5 text-4xl text-center mb-10 mt-10">
                Search Results for <i>{searchstring}</i>
              </h1>
              <div className="px-28 pt-5 gap-16 grid grid-cols-4">
              {products &&
                  products.map((product, index) => (
                    <div
                      id="product-list"
                      className="hover:shadow-lg "
                      key={index}
                    >
                      <Link to={`/product/${product.productID}`}>
                        <img
                          src={product.image}
                          alt="Product Image"
                          className="w-full mb-2 "
                        />
                        <div id="product-content" className="p-2 leading-5">
                          <h2 className="font-bold mb-1">{product.name}</h2>
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
          ) : (
            <div>
              <h1 className="py-0.5 px-5 text-4xl text-center mb-10 mt-10">
                No results found for <i>{searchstring}</i>
              </h1>
              <div className="flex pl-28 py-5">
        <div className="rounded-full bg-blue-100 p-3 ">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 ml-3 mt-3">You may also like</h1>
      </div>
              <div className="px-28 pt-5 gap-16 grid grid-cols-4">
              {productrec &&
                  productrec.map((product, index) => (
                    <div
                      id="product-list"
                      className="hover:shadow-lg "
                      key={index}
                    >
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
      )}
    </div>
  );
}

export default SearchResult;
