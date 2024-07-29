import logo from "../../assets/logo.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Checkout() {
  const { cartItems, getCartTotal, getCartSubTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
  }
  useEffect(() => {
    const loadAddress = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/" + user_id + "/address"
      );
      setAddress(response.data);
    };
    loadAddress();
  }, []);
  const [order, setOrder] = useState({
    user: user_id,
    address: "",
    customer_name: "",
    status: 1,
    subtotal: getCartSubTotal(),
    total_shipping: getCartTotal(),
  });
  const inputHandler = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  function addOrderItem(orderID) {
    function itemSum(item) {
      return item.price * item.quantity;
    }
    cartItems.map((item) => {
      const formData = new FormData();
      const total = itemSum(item);
      formData.append("order", orderID);
      formData.append("product", item.productID);
      formData.append("quantity", item.quantity);
      formData.append("total", total);
      //submit data
      axios
        .post("http://127.0.0.1:8000/api/orderdetail/", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log(response.status);
          console.log("There was a server issue");
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            toast: true,
            timer: 6000,
            position: "bottom-right",
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
        });
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", order.user);
    formData.append("address", order.address);
    formData.append("customer_name", order.customer_name);
    formData.append("status", order.status);
    formData.append("subtotal", order.subtotal);
    formData.append("total_shipping", order.total_shipping);
    axios
      .post("http://127.0.0.1:8000/api/order/", formData)
      .then((response) => {
        console.log(response);
        const order_id = response.data.orderID;
        addOrderItem(order_id);
        if (response.status === 201) {
          clearCart();
          console.log("Order successfully");
          navigate("/user/order-detail/" + order_id);
          Swal.fire({
            title: "Order Placed Successfully",
            icon: "success",
            toast: true,
            timer: 6000,
            position: "bottom-right",
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
        } else {
          console.log(response.status);
          console.log("There was a server issue");
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            toast: true,
            timer: 6000,
            position: "bottom-right",
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("There was a server issue");
          Swal.fire({
            title: "There was a server issue",
            icon: "error",
            toast: true,
            timer: 6000,
            position: "bottom-right",
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
      });
  };
  console.log(order);
  console.log(address[0]);
  return (
    <div>
      <div className="flex justify-center">
        <a href="/">
          <img src={logo} alt="american apparel" className="w-32" />
        </a>
      </div>
      <section className="bg-white py-8">
        <form className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={submitHandler}>
          <div className="flex justify-center">
            <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
              <li className="after:border-1 items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 flex gap-3">
                <span className="flex items-center">
                  <span className="block font-bold uppercase whitespace-nowrap text-primary-500 py-1 px-2 text-xs">
                    1
                  </span>
                  Cart
                </span>
              </li>
              <li className="after:border-1 flex items-center text-black after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500  sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-black-200 after:content-['/'] dark:after:text-black-500 sm:after:hidden">
                  <span className="block font-bold uppercase whitespace-nowrap text-black py-1 px-2 text-xs">
                    2
                  </span>
                  Checkout
                </span>
              </li>
              <li className="flex shrink-0 items-center">
                <span className="block font-bold uppercase whitespace-nowrap text-primary-500 py-1 px-2 text-xs">
                  3
                </span>
                Order summary
              </li>
            </ol>
          </div>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name*
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      className="block w-full  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      maxLength="256"
                      required="True"
                      onChange={inputHandler}
                      value={order.customer_name}
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-address"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Saved Address*
                      </label>
                    </div>
                    <select
                      id="select-address"
                      className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 "
                      name="address"
                      onChange={inputHandler}
                      value={order.address}
                      required="True"
                      >
                      {address.length > 0 ? (
                        address.map((add, index) => (
                          <option value={add.addressID} key={index}>
                            {add.name}, {add.tel}, {add.street}, {add.city}
                          </option>
                        ))
                      ) : (
                        <option>
                          Add an address before proceed with checkout
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <a
                      href="/user/add-address"
                      target="_blank"
                      className="flex w-full items-center justify-center gap-2  border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
                    >
                      <PlusIcon className="h-5 w-5 text-gray-0 cursor-pointer" />
                      Add new address
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <div className=" border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="pay-on-delivery"
                        aria-describedby="pay-on-delivery-text"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        defaultChecked
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="pay-on-delivery"
                        className="font-medium leading-none text-gray-900 dark:text-white"
                      >
                        Payment on delivery
                      </label>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        +$5 delievery fee
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We only provide payment on delivery at the moment. <br></br>
                  Please stay stuned for more update!
                </p>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              {cartItems.map((item, index) => (
                <div
                  className="flex gap-40 shadow-xl shadow-blue-gray-900/5"
                  key={index}
                >
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className=" h-24" />
                    <div className="flex flex-col">
                      <Link to={`/product/${item.productID}`}>
                        <h1 className="text-lg font-bold hover:text-gray-700">
                          {item.name}
                        </h1>
                      </Link>
                      <p className="text-gray-600">${item.price}</p>
                      <p className="text-gray-600">x{item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${getCartSubTotal()}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Shipping
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $5
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${getCartTotal()}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={address.length === 0}
                  className="flex w-full items-center justify-center px-5 py-2 bg-black text-white hover:bg-white hover:text-black border border-black disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white" 
                >
                  Place Order
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-1">
                  <a
                    href="/cart"
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Return to cart
                  </a>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-1">
                  <a
                    href="/"
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Or continue shopping
                  </a>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
