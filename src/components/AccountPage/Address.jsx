import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./Sidebar.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddressPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
  }
  useEffect(() => {
    const loadAddress = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/" + user_id + "/address"
      );
      setAddress(response.data);
      setLoading(false);
    };
    loadAddress();
  }, []);
  const DefaultAddressHandler = (addressID) => {
    const formData = new FormData();
    formData.append("addressID", addressID);
    axios
      .post(
        "http://127.0.0.1:8000/api/" +
          "mark_default_address/" +
          parseInt(addressID) +
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
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/user/" + user_id + "/address")
      .then((getData) => {
        setAddress(getData.data);
      });
  };
  const DeleteHandler = (id) => {
    axios
      .delete("http://127.0.0.1:8000/api/address/" + id)
      .then((response) => {
        if (response.status === 201 || response.status === 204) {
          console.log("Deleted successfully");
          navigate("/user/address");
          Swal.fire({
            title: "Deleted Successfully",
            icon: "success",
            toast: true,
            timer: 3000,
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
        getData();
      })
      .catch((e) => console.log("something went wrong!", e));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-7">
        <Sidebar />
        <div className="p-4 justify-between">
          <a
            href="/user/add-address"
            className="flex mb-2 p-2 border border-green-600 text-xm bg-white text-green-600 
           hover:bg-green-600 hover:text-white w-36"
          >
            Add Address
            <PlusIcon className="h-5 w-5 text-gray-0 cursor-pointer" />
          </a>
          <div className="flex gap-10 flex-wrap" id="address-list">
            {address &&
              address.map((add, index) => (
                <div
                  id="address-item"
                  key={index}
                  className="flex flex-col py-4 pl-4 shadow-xl shadow-blue-gray-900/5 w-64"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <h1 className="font-bold">{add.name}</h1>
                      {add.default == true && (
                        <div className="inline-flex flex-shrink-0 items-center bg-green-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">
                          Default
                        </div>
                      )}
                      {add.default == false && (
                        <button
                          onClick={() => DefaultAddressHandler(add.addressID)}
                          className="inline-flex flex-shrink-0 items-center  bg-green-50 px-1.5 py-0.5 text-xs font-medium text-black-600 ring-1 ring-inset ring-green-600/20"
                        >
                          Mark as default
                        </button>
                      )}
                    </div>
                    {/* <Link to={`/user/address/${add.addressID}`}>
                      <PencilIcon className="h-5 w-5 text-gray-0 cursor-pointer float-end" />
                    </Link> */}
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-800">
                    Tel: {add.tel}
                  </p>
                  <p className="mt-1 truncate text-sm text-gray-800">
                    {add.street}
                  </p>
                  <p className="mt-1 truncate text-sm text-gray-800">
                    {add.city}
                  </p>
                  {add.default == true && (
                    <Link to={`/user/address/${add.addressID}`}>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                    </Link>
                  )}
                  {add.default == false && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          DeleteHandler(add.addressID, add.default)
                        }
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        Delete
                      </button>
                      <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>
                      <Link to={`/user/address/${add.addressID}`}>
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPage;
