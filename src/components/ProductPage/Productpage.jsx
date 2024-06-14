import { useContext, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import "./Productpage.css";
import landpage from "../../assets/landpage.jpg";
import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import { CartContext } from "../../Context/CartProvider";

const ProductList = () => {
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProduct] = useState([]);
  useEffect(() => {
    retrieveProduct();
  }, []);

  const retrieveProduct = () => {
    ProductService.getAll()
      .then((response) => {
        setProduct(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="pb-5">
        {/* <Carousel>
          <img
            src={landpage}
            alt="american apparel landpage"
            className="h-full w-full object-cover"
          />
        </Carousel> */}
      </div>
      <div className="flex flex-row py-0.5 px-5 items-center justify-center gap-14 flex-wrap">
        {products &&
          products.map((product, index) => (
            <div id="product-list" className="hover:shadow-lg " key={index}>
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
  );
};
export default ProductList;
