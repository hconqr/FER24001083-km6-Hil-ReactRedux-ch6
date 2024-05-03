import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/reducers/loginRdc";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const token = useSelector((state) => state.login?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token ", token);
    if (token !== null) {
      alert("Tidak perlu registrasi lagi");
      window.location.reload();
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    try {
      const responseRegister = await fetch(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            name: name,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (responseRegister.ok) {
        const jsonRegister = await responseRegister.json();
        console.log("json", jsonRegister);
        dispatch(setToken(jsonRegister.data.token));
        alert("Berhasil register!");
        navigate("/");
        window.location.reload(); // Pindahkan pengguna ke halaman utama setelah berhasil mendaftar
      } else {
        const errorResponse = await responseRegister.json();
        throw new Error(errorResponse.message || "Failed to register.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Register</h1>
          </div>
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className="flex justify-around">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
