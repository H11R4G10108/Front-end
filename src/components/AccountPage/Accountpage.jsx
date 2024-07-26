import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./Sidebar.jsx";

export default function Dashboard() {
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
    var username = decode.username;
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-5">
        <Sidebar />
        <div className="bg-white py-8">
          <p>Hello {username}!</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
