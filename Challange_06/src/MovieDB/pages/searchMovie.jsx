import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../../redux/actions/searchMovieAct";
import {
  setLanguage,
  setQuery,
  setYear,
} from "../../redux/reducers/searchMovieRdc";
import { setId } from "../../redux/reducers/detailMovieRdc";
import Navbar from "../../Pages/Navbar";
import Footer from "../../Pages/Footer";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.searchMovie?.movies);
  const searchKeyword = useSelector((state) => state.searchMovie?.query);
  const searchYear = useSelector((state) => state.searchMovie?.year);

  useEffect(() => {
    dispatch(searchMovie());
  }, []);

  function limitWord(text, limit) {
    const words = text.split(/\s+/); // Split teks berdasarkan spasi
    const slicedText = words.slice(0, limit).join(" "); // Ambil hanya jumlah kata sesuai limit
    return slicedText + (words.length > limit ? "..." : ""); // Tambahkan elipsis jika jumlah kata melebihi limit
  }

  const handleChangeQuery = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const handleYear = (e) => {
    dispatch(setYear(e.target.value));
  };

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value; // Ambil nilai bahasa yang dipilih
    dispatch(setLanguage(selectedLanguage)); // Set state bahasa dengan nilai yang dipilih
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await searchMovie();
    window.location.reload();
    document
      .getElementById("movie-grid")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="items-center justify-center h-screen bg-landing bg-gray-800">
        <div className="flex flex-col items-center pt-10">
          <h1 className="text-white text-3xl font-bold mb-4  text-shadow-md">
            Movie Search
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mb-4 w-full max-w-lg flex items-center gap-2"
          >
            <div className="flex items-center border rounded p-2 bg-white">
              <input
                type="text"
                placeholder="Search for a movie"
                value={searchKeyword}
                onChange={handleChangeQuery}
                className=" bg-transparent border border-black rounded mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              />
              <select
                onChange={handleYear}
                className=" bg-transparent border border-black rounded mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                <option>Rentang Tahun</option>
                <option value="2021">1900 - 2021</option>
                <option value="2022">1900 - 2022</option>
                <option value="2023">1900 - 2023</option>
              </select>
              <select
                onChange={handleChangeLanguage}
                className=" bg-transparent border border-black rounded mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                <option value="">Pilih Bahasa</option>
                <option value={"en-US"}>English</option>
                <option value="id-ID">Indonesian</option>
                <option value="ar-SA">Arabic</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          id="movie-grid"
          className="bg-gray-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-landing text-center"
        >
          {data &&
            data.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md"
                  />
                  <h1 className="text-2xl">{movie.title}</h1>

                  <h2 className="text-gray-600 mb-2">
                    Release Date: {movie.release_date}
                  </h2>
                  <p className="text-gray-700 text-justify">
                    {limitWord(movie.overview, 20)}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      navigate("/movie-detail", dispatch(setId(movie?.id)));
                    }}
                    className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-72 text-center transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MovieSearch;
