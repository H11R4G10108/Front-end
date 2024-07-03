import { useState, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar/Navbar";

export default function Dashboard() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
    var username = decode.username;
  }

  return (
    <div>
      <Navbar />
      <div>
        <span>Hello {username}!</span>
      </div>
    </div>
  );
}
