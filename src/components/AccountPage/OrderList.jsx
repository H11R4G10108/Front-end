import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function OrderList() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const loadOrder = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/orderview/");
      setOrder(response.data);
    };
    loadOrder();
  }, []);
  const cancelOrder = (orderID) => {
    const formData = new FormData();
    formData.append("orderID", orderID);
    axios
      .post(
        "http://127.0.0.1:8000/api/" +
          "cancel-order/" +
          parseInt(orderID) +
          "/",
        formData
      )
      .then((response) => {
        if (response.data.bool == true) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-7">
        <Sidebar />
        <div className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-2 pt-4 ">
          {order.length > 0 ? (
            <div className="bg-white pt-8">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Shipping fee
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      View Detail
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {order &&
                    order.map((item, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <div className="flex items-center">
                            <p className="text-gray-900 whitespace-no-wrap ">
                              #{item.orderID}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${item.subtotal}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${item.shipping_fee}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${item.total_shipping}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          {item.status.status === "Pending" && (
                            <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {item.status.status}
                              </span>
                            </span>
                          )}
                          {item.status.status === "Delivered" && (
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {item.status.status}
                              </span>
                            </span>
                          )}
                          {item.status.status === "Shipping" && (
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {item.status.status}
                              </span>
                            </span>
                          )}
                          {item.status.status === "Processing" && (
                            <span className="relative inline-block px-3 py-1 font-semibold text-orange-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {item.status.status}
                              </span>
                            </span>
                          )}
                          {item.status.status === "Canceled" && (
                            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {item.status.status}
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <Link to={`/user/order-detail/${item.orderID}`}>
                            <p className="text-blue-900 whitespace-no-wrap underline">
                              View
                            </p>
                          </Link>
                        </td>
                        {item.status.status === "Pending" ? (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link to={`/edit-order/${item.orderID}`}>
                              <p className="text-green-900 whitespace-no-wrap underline">
                                Edit Order Address
                              </p>
                            </Link>
                            <button onClick={() => cancelOrder(item.orderID)}>
                              <p className="text-red-900 whitespace-no-wrap underline">
                                Cancel order
                              </p>
                            </button>
                          </td>
                        ) : (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm invisible">
                            <Link to={`/edit-order/${item.orderID}`}>
                              <p className="text-green-900 whitespace-no-wrap underline">
                                Edit Order Address
                              </p>
                            </Link>
                            <button onClick={() => cancelOrder(item.orderID)}>
                              <p className="text-red-900 whitespace-no-wrap underline">
                                Cancel order
                              </p>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div> */}
            </div>
          ) : (
            <div className="bg-white py-8">
              <p>There's no order</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-1">
                <a
                  href="/"
                  className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue shopping
                </a>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
