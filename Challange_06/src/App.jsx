import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import LoginApp from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MovieSearch from "./MovieDB/pages/searchMovie";
import MovieDetail from "./MovieDB/pages/detailMovie";
import TrendingMovie from "./MovieDB/pages/trendingMovies";
import PopularMovie from "./MovieDB/pages/PopularMovie";
import FavMovies from "./MovieDB/pages/FavMovies";
import NowPlaying from "./MovieDB/pages/movie";
import Upcoming from "./MovieDB/pages/upcomingMovie";
import { useSelector } from "react-redux";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!useSelector((state) => state.login?.token)
  );
  console.log("isLoggedIn :>> ", isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginApp />,
    },
    {
      path: "/regist",
      element: <Register />,
    },
    {
      path: "/movie-search",
      element: isLoggedIn ? <MovieSearch /> : <Navigate to="/login" />,
    },
    {
      path: "/movie-detail",
      element: isLoggedIn ? <MovieDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/movie-trending",
      element: isLoggedIn ? <TrendingMovie /> : <Navigate to="/login" />,
    },
    {
      path: "/movie-popular",
      element: isLoggedIn ? <PopularMovie /> : <Navigate to="/login" />,
    },
    {
      path: "/movie-favorite",
      element: isLoggedIn ? <FavMovies /> : <Navigate to="/login" />,
    },
    {
      path: "/movie-now",
      element: isLoggedIn ? <NowPlaying /> : <Navigate to="/login" />,
    },
    {
      path: "/upcoming",
      element: isLoggedIn ? <Upcoming /> : <Navigate to="/login" />,
    },
  ]);
  return (
    <GoogleOAuthProvider clientId="952236699134-v5lj1cru3f096cg7cspivq8i2e34c0se.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
