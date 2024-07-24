import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import "./Address.css";

function AddAddress() {
  const [showModal, setShowModal] = useState(false);
  const [addressdata, setAddressdata] = useState([]);
  const token = localStorage.getItem("authTokens");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const loadAddress = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/" + user_id + "/address"
      );
      setAddressdata(response.data);
    };
    loadAddress();
  }, []);
  const handleFocus = (e) => {
    setFocused(true);
  };
  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
  }
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    user: user_id,
    name: "",
    tel: "",
    city: "",
    street: "",
    default: "true",
  });
  console.log(address);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", address.user);
    formData.append("name", address.name);
    formData.append("tel", address.tel);
    formData.append("city", address.city);
    formData.append("street", address.street);
    formData.append("default", address.default);
    axios
      .post("http://127.0.0.1:8000/api/create-address/", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("Added successfully");
          navigate("/user/address");
          Swal.fire({
            title: "Added Successfully",
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const inputHandler = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  const inputHandlerforcheck = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.checked,
    });
  };
  console.log(address)
  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-7">
        <Sidebar />
        <div className="p-4 mx-auto">
          <div className="px-5 max-w-md mx-auto bg-white p-10 shadow shadow-slate-300 gap-15">
            <form>
              <label>Name</label>
              <input
                className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                name="name"
                type="text"
                placeholder="Place's name"
                required="True"
                onChange={inputHandler}
                value={address.name}
                maxLength="16"
              />
              <label>Telephone</label>
              <input
                className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                name="tel"
                required="True"
                type="tel"
                placeholder="Your phone number"
                pattern="^0\d{9,10}$"
                onChange={inputHandler}
                onBlur={handleFocus}
                focused={focused.toString()}
                value={address.tel}
              />
              <label>City</label>
              <input
                className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                name="city"
                type="text"
                placeholder="City"
                required="True"
                onChange={inputHandler}
                value={address.city}
              />
              <label>Street</label>
              <input
                className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                name="street"
                type="text"
                placeholder="Street"
                required="True"
                onChange={inputHandler}
                value={address.street}
              />
              {addressdata.length>0 ?(
              <div className="flex items-center pt-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                  name="default"
                  onChange={inputHandlerforcheck}
                  value={address.default}
                />
                <label
                  htmlFor="safeAdress"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Save as default address
                </label>
              </div>
              ): (
                <div className="flex items-center pt-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                  name="default"
                  checked
                  disabled
                />
                <label
                  htmlFor="safeAdress"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Save as default address
                </label>
              </div>              )}
              <button
                type="button"
                className="px-4 py-2 mt-8 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white"
                onClick={submitHandler}
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
