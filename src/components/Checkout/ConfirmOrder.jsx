import axios from "axios";
import {useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/outline";
function ConfirmOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/orderview/" + id
      );
      setOrder(response.data);
      setLoading(false);
    };
    loadOrder();
  }, []);
  useEffect(() => {
    const loadOrderDetail = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/order/" + id + "/detail"
      );
      setOrderDetail(response.data);
    };
    loadOrderDetail();
  }, []);
  console.log(order);
  console.log(orderDetail);

  return (
    <div>
      {loading ? (
        <div className="text-center flex justify-center ">Loading...</div>
      ) : (
        <>
          <div className="flex justify-center">
            <a href="/">
              <img src={logo} alt="american apparel" className="w-32" />
            </a>
          </div>
          <section className="bg-white py-8">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="flex justify-center ">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                  <li className="after:border-1 items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 flex gap-3">
                    <span className="flex items-center">
                      <span className="block font-bold uppercase whitespace-nowrap text-primary-500 py-1 px-2 text-xs">
                        1
                      </span>
                      Cart
                    </span>
                  </li>
                  <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500  sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                    <span className="flex items-center after:mx-2 after:text-black-200 after:content-['/'] dark:after:text-black-500 sm:after:hidden">
                      <span className="block font-bold uppercase whitespace-nowrap text-primary-700 py-1 px-2 text-xs">
                        2
                      </span>
                      Checkout
                    </span>
                  </li>
                  <li className="flex shrink-0 items-center text-black">
                    <span className="block font-bold uppercase whitespace-nowrap text-primary-500 py-1 px-2 text-xs">
                      3
                    </span>
                    Order summary
                  </li>
                </ol>
              </div>
              <div className="md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Order #{id}
                  </h1>
                  <p className="text-base font-medium leading-6 text-gray-600">
                    {order.date_order}
                  </p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-4 space-y-2 md:space-y-4 xl:space-y-0">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    {/* PRODUCT SECTION */}
                    {orderDetail &&
                      orderDetail.map((detail, index) => (
                        <div
                          className="md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full shadow-blue-gray-900/5"
                          key={index}
                        >
                          <div className="pb-2 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full md:block"
                              src={detail.product.image}
                              alt="product"
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start">
                              <h1
                                key={index}
                                className="text-xl font-semibold text-gray-800"
                              >
                                {detail.product.name}
                              </h1>
                              <p className="text-sm flex gap-2 text-gray-500">
                                <span>Size:</span>
                                <span key={index}>
                                  {" "}
                                  {detail.product.size.size}
                                </span>
                              </p>
                              <p
                                className="text-baseleading-6 text-gray-800"
                                key={index}
                              >
                                x{detail.quantity}
                              </p>
                              <p className="text-base leading-6" key={index}>
                                ${detail.total}
                              </p>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p
                                className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"
                                key={index}
                              >
                                ${detail.product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* SUMMARY TOTAL SECTION */}
                    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full shadow-xl shadow-blue-gray-900/5 space-y-6">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                          Summary
                        </h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          <div className="flex justify-between w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                              ${order.subtotal}
                            </p>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">
                              Shipping
                            </p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                              $5.00
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                            ${order.total_shipping}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full shadow-xl shadow-blue-gray-900/5 space-y-6">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                          Shipping
                        </h3>
                        <div className="flex justify-between items-start w-full">
                          <div className="flex justify-center items-center space-x-4">
                            <div className="w-8 h-8">
                              <img
                                className="w-full h-full"
                                alt="logo"
                                src="https://i.ibb.co/L8KSdNQ/image-3.png"
                              />
                            </div>
                            <div className="flex flex-col justify-start items-center">
                              <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                                DPD Delivery
                                <br />
                                <span className="font-normal">
                                  Delivery with 24 Hours
                                </span>
                              </p>
                            </div>
                          </div>
                          <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                            $5.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CUSTOMER SECTION */}
                  {order.address && (
                    <div className="shadow-xl shadow-blue-gray-900/5 w-full xl:w-96 flex items-center md:items-start px-2 py-6 md:p-2 xl:p-2 flex-col">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Customer
                      </h3>
                      <div className="flex flex-col md:flex-row xl:flex-col justify-start w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                          <div className="flex justify-center w-full md:justify-start items-center py-4 border-b border-gray-200">
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-base dark:text-white font-semibold text-left text-gray-800">
                                {order.customer_name}
                              </p>
                            </div>
                          </div>
                          <div className="text-gray-800 md:justify-start py-4 border-b border-gray-200 w-full flex flex-col gap-3">
                            <div className="flex gap-2">
                              <PhoneIcon className="h-5 w-5 text-gray-900" />
                              <p className="cursor-pointer text-sm ">
                                {order.address.tel}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                Shipping Address
                              </p>
                              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                {order.address.name}, {order.address.street},{" "}
                                {order.address.city}
                              </p>
                            </div>
                          </div>
                          <a
                            href="/user/order"
                            className="px-4 py-2 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white text-center mt-6"
                          >
                            OK
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ConfirmOrder;
