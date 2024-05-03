import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFavoriteMovies } from "../../redux/actions/favMovieAct";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setId } from "../../redux/reducers/detailMovieRdc";
import { languageState } from "../../redux/reducers/favMovieRdc";

const Navbar = () => {
  return (
    <div className="bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            to={`/`}
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
          >
            Home
          </Link>
          <Link
            to={`/movie-trending`}
            className="text-white  hover:bg-red-500 p-2 rounded mr-4"
          >
            Trending
          </Link>
          <Link
            to={`/movie-favorite`}
            className="text-white bg-blue-600 hover:bg-red-500 p-2 rounded mr-4"
          >
            Favorite
          </Link>
          <Link
            to={`/movie-popular`}
            className="text-white hover:bg-red-500 p-2 mr-4 rounded"
          >
            Popular
          </Link>
          <Link
            to={`/movie-now`}
            className="text-white hover:bg-red-500 p-2 rounded"
          >
            Now Playing
          </Link>
        </div>
        <div>
          <Link
            to={`/movie`}
            className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
          >
            Cari Movie
          </Link>
        </div>
      </nav>
    </div>
  );
};

const FavMovies = () => {
  const navigate = useNavigate(); // Move useNavigate inside the component
  const dispatch = useDispatch();
  const data = useSelector((state) => state.favMovie.movies);
  const language = useSelector((state) => state.favMovie);
  console.log("language", language);

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, []);

  const handleLanguage = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(languageState(selectedLanguage)); // Pass the selected language as payload
    console.log("languageState", languageState);
  };

  const handleMovieClick = (movieId) => {
    navigate("/movie-detail", dispatch(setId(movieId)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.reload();
    favMovies();
  };

  return (
    <div>
      <h1 className="text-center my-10 font-bold text-2xl">Favorite Movie</h1>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form onSubmit={handleSubmit}>
          <div className="mx-10 ml-14 mb-8">
            <select
              onChange={handleLanguage}
              defaultValue=""
              className="p-2 mr-4 border outline-none focus:border-blue-600 rounded-sm hover:shadow-lg"
            >
              <option value="" disabled hidden>
                Language
              </option>
              <option value="ar-SA">Arabic</option>
              <option value="en-US">English</option>
              <option value="id-ID">Indonesian</option>
            </select>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-black hover:text-white me-4 p-2 rounded-md border-double border-[3px]"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-8 pb-2">
          {data.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-y-3 max-w-[380px] min-w-[300px] max-sm:min-w-[250px] rounded-lg items-center border p-4  shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <h2>{movie.original_title}</h2>
              <h2 className="font-light m-1 mb-3 mx-4 text-justify">
                {movie.overview}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CombinedComponent = () => {
  return (
    <>
      <Navbar />
      <FavMovies />
    </>
  );
};

export default CombinedComponent;
