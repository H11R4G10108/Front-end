import http from "../http-common";

const getAll = () => {
  return http.get("/product/");
};

const ProductService = {
  getAll,
};

export default ProductService;
