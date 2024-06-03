import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setLanguage,
  setPage,
  setRegion,
} from "../../redux/reducers/popularMovieRdc";
import { moviesPopular } from "../../redux/actions/popularMovieAct";
import { setId } from "../../redux/reducers/detailMovieRdc";
import Navbar from "../../Pages/Navbar";
import Footer from "../../Pages/Footer";

export default function PopularMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.popularMovie?.movies);

  useEffect(() => {
    dispatch(moviesPopular());
  }, []);

  const handlePageChange = (event) => {
    const pageNumber = event.target.value;
    dispatch(setPage(pageNumber));
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    dispatch(setRegion(selectedRegion));
  };

  const handleShowPopularMovies = () => {
    moviesPopular();
    window.location.reload();
  };

  return (
    <div
      className="font-poppins"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar />
      <div className="mx-auto p-4 bg-gray-800">
        <h1 className="text-3xl text-center font-bold mt-7 mb-4 text-white">
          Popular Movies
        </h1>
        <div className="flex justify-center items-center mt-7 mb-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleLanguageChange}
          >
            <option value="" selected disabled>
              Language
            </option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
            <option value="ar-SA">Arabic</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handlePageChange}
          >
            <option value="" selected disabled>
              Page
            </option>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleRegionChange}
          >
            <option value="" selected disabled>
              All Regions
            </option>
            <option value="SA">Saudi Arabia</option>
            <option value="ID">Indonesia</option>
            <option value="EN">EN</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded-md focus:outline-none focus:ring"
            onClick={handleShowPopularMovies}
          >
            Show
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {data &&
            data.map((movie) => (
              <div
                key={movie.id}
                className="bg-white border p-4 rounded-lg shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                style={{ height: "100%" }}
              >
                <div
                  className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative"
                  onClick={() => {
                    navigate("/movie-detail", dispatch(setId(movie?.id)));
                  }}
                >
                  <img
                    className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="max-w-44 rounded-sm"
                  />
                  <h2 className="font-bold px-5 text-xl mt-3 mb-2">
                    {movie.title}
                  </h2>
                  <h2 className="px-5 mb-2">
                    Release date: {movie.release_date}
                  </h2>
                  <h2 className="font-thin px-5 mb-2 text-justify">
                    {movie.overview.slice(0, 150)}...
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
