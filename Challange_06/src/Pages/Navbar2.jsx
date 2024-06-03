import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/loginRdc";
import logo from "../../public/Logo_movieku.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statenya = useSelector((state) => state);

  const logoutin = useSelector((state) => state.login?.token);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    alert("Berhasil logout");
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-900">
      <nav className="container mx-auto flex items-center justify-around py-4">
        <div className="flex items-center">
          <button
            className="text-white block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <img src={logo} alt="Logo" className="h-8 mr-4" />

          <div
            className={`lg:flex ${
              isOpen ? "block" : "hidden"
            } flex-col lg:flex-row lg:items-center lg:space-x-4`}
          >
            <Link
              to="/"
              className="text-white hover:bg-red-500 p-2 rounded lg:mr-4"
              onClick={handleCloseSidebar}
            >
              Home
            </Link>
            {logoutin && (
              <Link
                to="/movie-trending"
                className="text-white hover:bg-red-500 p-2 rounded lg:mr-4"
                onClick={handleCloseSidebar}
              >
                Trending
              </Link>
            )}
            <Link
              to="/movie-favorite"
              className="text-white hover:bg-red-500 p-2 rounded lg:mr-4"
              onClick={handleCloseSidebar}
            >
              Favorite
            </Link>
            <Link
              to="/movie-popular"
              className="text-white hover:bg-red-500 p-2 lg:mr-4 rounded"
              onClick={handleCloseSidebar}
            >
              Popular
            </Link>
            <Link
              to="/movie-now"
              className="text-white hover:bg-red-500 p-2 lg:mr-4 rounded"
              onClick={handleCloseSidebar}
            >
              Now Playing
            </Link>
            <Link
              to="/upcoming"
              className="text-white hover:bg-red-500 p-2 rounded"
              onClick={handleCloseSidebar}
            >
              Upcoming
            </Link>
            <Link
              to="/movie-search"
              className="hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block lg:ml-4"
              onClick={handleCloseSidebar}
            >
              Cari Movie
            </Link>
          </div>
        </div>
        <div>
          {logoutin ? (
            <button
              className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
