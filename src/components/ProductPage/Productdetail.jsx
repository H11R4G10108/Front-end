import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const Productdetail = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const getProduct = () => {
    axios
      .get("http://127.0.0.1:8000/api/product/" + id)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-10">
        <div className="flex ">
          <div className="flex-none relative w-6/12">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-col gap-5">
              <h1 className="flex-auto text-5xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <div className="text-2xl font-semibold text-black-500">
                ${product.price}
              </div>
            </div>

            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
              <div className="space-x-2 flex text-sm"></div>
            </div>
            <div className="flex space-x-4 mb-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4">
                <button
                  className="h-10 px-6 font-semibold rounded-md border border-black-800 text-gray-50 bg-gray-900 hover:bg-blue-gray-700"
                  type="button"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
