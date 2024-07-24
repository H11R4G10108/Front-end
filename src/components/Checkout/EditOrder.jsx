import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";

function EditOrder() {
  const navigate = useNavigate();
  const { order_id } = useParams();
  const [address, setAddress] = useState([]);
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
  }
  //load order info
  useEffect(() => {
    const loadOrder = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/order/" + order_id + "/"
      );
      setOrder(response.data);
    };
    loadOrder();
  }, []);
  //load address info
  useEffect(() => {
    const loadAddress = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/" + user_id + "/address"
      );
      setAddress(response.data);
    };
    loadAddress();
  }, []);
  //input handler
  const inputHandler = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  //update submit
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
      .put("http://127.0.0.1:8000/api/order/" + order_id + "/", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Edit Order successfully");
          navigate("/user/order-detail/" + order_id);
          Swal.fire({
            title: "Order Edited Successfully",
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
      });
  };
  return (
    <div>
      <div className="flex justify-center">
        <a href="/">
          <img src={logo} alt="american apparel" className="w-32" />
        </a>
      </div>
      <div className="bg-white py-8">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
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
                required
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
                required
              >
                {address &&
                  address.map((add, index) => (
                    <option value={add.addressID} key={index}>
                      {add.name}, {add.tel}, {add.street}, {add.city}
                    </option>
                  ))}
              </select>

              <div className="space-y-3">
                <a
                  href="/user/add-address"
                  className="flex w-full items-center justify-center gap-2  mt-7 border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
                >
                  <PlusIcon className="h-5 w-5 text-gray-0 cursor-pointer" />
                  Add new address
                </a>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center px-5 py-2 mt-7 bg-black text-white hover:bg-white hover:text-black border border-black"
                  onClick={submitHandler}
                >
                  Confirm
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-1">
                  <a
                    href="/user/order/"
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Go back
                  </a>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrder;
