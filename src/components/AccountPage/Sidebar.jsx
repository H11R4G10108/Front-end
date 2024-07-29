import React, { useEffect, useState } from "react";
import {
  QueueListIcon,
  Cog6ToothIcon,
  PowerIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function sidebar() {
  const { logoutUser } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem("authTokens");
  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
  }
  useEffect(() => {
    const loadOrder = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/user/" + user_id + "/order");
      setOrder(response.data);
    };
    loadOrder();
  }, []);
  return (
    <div>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white  w-full max-w-[20rem] p-4 ">
        <div className="mb-2 p-4">
          <h5 className="block  text-xl font-semibold leading-snug">
            User Profile
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal ">
          <a
            href="/user/order"
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 clipRuletext-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <QueueListIcon className="h-5 w-5 text-black-0 cursor-pointer" />
            </div>
            Order history
            <div className="grid place-items-center ml-auto justify-self-end">
              <div className="relative grid items-center  font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                <span className="">{order.length}</span>
              </div>
            </div>
          </a>
          <a
            href="/user/address"
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 clipRuletext-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <BriefcaseIcon className="h-5 w-5 text-black-0 cursor-pointer" />
            </div>
            Address
          </a>

          <a
            href="/change-password/" tabIndex="0"
            className="flex items-center w-full p-3 clipRuletext-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <Cog6ToothIcon className="h-5 w-5 text-black-0 cursor-pointer" />
            </div>
            Change password
          </a>
          <div
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 clipRuletext-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={logoutUser}
          >
            <div className="grid place-items-center mr-4">
              <PowerIcon className="h-5 w-5 text-black-0 cursor-pointer" />
            </div>
            Sign Out
          </div>
        </nav>
      </div>
    </div>
  );
}

export default sidebar;
