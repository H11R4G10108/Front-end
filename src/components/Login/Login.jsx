import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    email.length > 0 && loginUser(email, password);
    console.log(email);
    console.log(password);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="max-w-lg mx-auto bg-white p-10 shadow shadow-slate-300 gap-15">
          <h1 className="text-4xl font-medium mb-5">Sign in to continue</h1>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="user-username">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  aria-invalid="false"
                  className="w-full py-3 border-b-2 border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  maxLength="100"
                />
                <label
                  htmlFor="password"
                  className="font-medium text-slate-700 pb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  aria-invalid="false"
                  className="w-full py-3 border-b-2  border-slate-200 px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  maxLength="128"
                />
              </div>
              <div className="flex flex-col gap-1">
                {/* <a href="#" className="font-medium text-indigo-400 text-sm">
                  Forgot Password?
                </a> */}
                <div className="flex flex-row gap-1">
                  <p className="font-medium text-sm">Don't have an account?</p>
                  <a
                    href="/user/register/"
                    className="font-medium text-indigo-400 text-sm"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
            <button
              id="submit-btn"
              className="px-4 py-2 mt-5 w-full hover:bg-white hover:text-black border border-black text-xm bg-black text-white"
              type="submit"
              // disabled={!buttonEnable}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
