import { useState } from "react";
import useAxios from "../../utils/useAxios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./Sidebar.jsx";
import Swal from "sweetalert2";
import "./ChangePassword.css";
import { LockClosedIcon } from "@heroicons/react/24/outline";
export default function ChangePassword() {
  const api = useAxios();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("old_password", oldpassword);
    formData.append("new_password", password);
    const response = await api
      .put("/change-password/", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Changed successfully");
          Swal.fire({
            title: "Changed Successfully",
            icon: "success",
            toast: true,
            timer: 3000,
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
          title: "Wrong password!",
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-5">
        <Sidebar />
        <div className="bg-white py-8 max-w-md mx-auto shadow shadow-slate-300 gap-15 mt-8">
          <LockClosedIcon className="h-20 w-20 mx-auto " />
          <form onSubmit={submitHandler} className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="oldpassword"
                  className="font-medium text-slate-700 pb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldpassword"
                  name="oldpassword"
                  placeholder="Enter your current password"
                  aria-invalid="false"
                  className="w-full py-3 border-b-2  border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  maxLength="128"
                  onChange={(e) => setOldPassword(e.target.value)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <label
                  htmlFor="password"
                  className="font-medium text-slate-700 pb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  aria-invalid="false"
                  className="w-full py-3 border-b-2  border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  maxLength="20"
                  pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span className="text-xs p-1 text-red-700 hidden">
                  Password should be 8-20 characters and include at least 1
                  letter, 1 number and 1 special character!
                </span>
                <label
                  htmlFor="password2"
                  className="font-medium text-slate-700 pb-2"
                >
                  Confirm new password
                </label>
                <input
                  className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  name="password2"
                  type="password"
                  placeholder="At least 8 characters"
                  required="True"
                  onChange={(e) => setPassword2(e.target.value)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                {password !== password2 && (
                  <span className="text-xs p-1 text-red-700">
                    Passwords don't match!
                  </span>
                )}
              </div>
            </div>
            <button
              id="submit-btn"
              className="px-4 py-2 mt-2 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white"
              type="submit"
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
