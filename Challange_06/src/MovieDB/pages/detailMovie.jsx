import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../redux/actions/detailMovieAct";
import NoImage from "../assets/notFound_BG.jpg";

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
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
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
          <Link
            to={`/upcoming`}
            className="text-white hover:bg-red-500 p-2 rounded"
          >
            Upcoming
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default function Detail() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.detail?.id);
  console.log("id", id);
  const movie = useSelector((state) => state.detail?.detail);
  console.log("Movie", movie);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, []);

  const backgroundImageUrl = movie
    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    : "";

  return (
    <div>
      <Navbar />
      <div
        className="mx-auto p-4 bg-black bg-cover"
        style={{
          backgroundImage: `url(${
            backgroundImageUrl ? backgroundImageUrl : "NoImage"
          })`,
        }}
      >
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4">
          <div className="flex flex-col lg:flex-row p-5 pb-10">
            <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={
                  movie && movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : NoImage
                }
                alt={movie && movie.title}
                className="w-auto max-h-96 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold my-4 text-blue-900">
                {movie && movie.title}
              </h2>
              <h2 className="text-gray-600 mb-2">
                Release date: {movie && movie.release_date}
              </h2>
              <h2 className="mb-2">Status: {movie && movie.status}</h2>
              <h2 className="mb-2">
                Popularity: {movie && movie.popularity} viewers
              </h2>
              <h2 className="mb-2">
                Runtime: {movie && movie.runtime} minutes
              </h2>
              <p className="text-gray-800 mb-4">{movie && movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
