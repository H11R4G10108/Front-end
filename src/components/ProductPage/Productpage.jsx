import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductService from "../../services/ProductService";

const ProductList = () => {
  const [product, setProduct] = useState([]);

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
      <h1>Product Page Test</h1>
    </div>
  );
};
export default ProductList;
