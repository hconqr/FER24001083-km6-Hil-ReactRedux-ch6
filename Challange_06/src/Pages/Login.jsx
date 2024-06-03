import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../redux/reducers/loginRdc";
import { login } from "../redux/actions/loginAct";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.login?.email);
  const password = useSelector((state) => state.login?.password);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value)); // Dispatch action untuk mengubah password di Redux state
  };

  const handleLogin = async () => {
    const response = await dispatch(login(email, password, navigate)); // Kirim email dan password ke action creator login
    if (response.status === 200) {
      window.location.reload();
    } else {
      alert("Gagal login. Silakan coba lagi."); // Handle error jika login gagal
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Login</h1>
          </div>
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange} // Gunakan fungsi untuk mengubah email
          />
          <input
            className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange} // Gunakan fungsi untuk mengubah password
          />
          <div className="flex justify-around">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/regist")}
            >
              Register
            </button>
          </div>
          <GoogleLogin />
          {/* <GoogleLogin buttonText="Login with Google" /> */}
        </div>
      </div>
    </div>
  );
}
