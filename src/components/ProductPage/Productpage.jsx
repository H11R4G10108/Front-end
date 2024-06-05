import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductService from "../../services/ProductService";
import "./Productpage.css";
import landpage from "../../assets/landpage.jpg";

const ProductList = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    retrieveProduct();
  }, []);

  const retrieveProduct = () => {
    ProductService.getAll()
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="pb-5">
        <img src={landpage} alt="american apparel landpage" />
      </div>
      <div className="flex flex-row py-0.5 px-5 items-center justify-center gap-5 flex-wrap">
        {products &&
          products.map((product, index) => (
            <div class="product" key={index}>
              <img src="https://via.placeholder.com/300" alt="Product Image" />
              <div class="product-content">
                <h2 className="font-bold">{product.name}</h2>
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ProductList;
