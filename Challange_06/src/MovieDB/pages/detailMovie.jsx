import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  fetchTrailer,
} from "../../redux/actions/detailMovieAct";
import NoImage from "../assets/notFound_BG.jpg";
import Navbar from "../../Pages/Navbar";
import Footer from "../../Pages/Footer";

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statenya = useSelector((state) => state);
  const id = useSelector((state) => state.detail?.id);
  const movie = useSelector((state) => state.detail?.detail);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchTrailer(id));
  }, []);

  const trailerMovie = useSelector((state) => state.detail?.trailer);
  const theTrailer =
    trailerMovie && trailerMovie.results && trailerMovie.results.length > 0
      ? trailerMovie.results[0].key
      : null;

  function redirectToYouTube() {
    const youtubeUrl = theTrailer
      ? `https://www.youtube.com/watch?v=${theTrailer}`
      : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    window.open(youtubeUrl, "_blank");
  }
  const backgroundImageUrl = movie
    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    : "";

  return (
    <div className="w-full">
      <Navbar />
      <div
        className="mx-auto p-4 bg-black bg-cover"
        style={{
          backgroundImage: `url(${
            backgroundImageUrl ? backgroundImageUrl : "NoImage"
          })`,
        }}
      >
        <div className="bg-slate-200 bg-opacity-60 rounded-lg shadow-lg p-4">
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
              <button
                onClick={redirectToYouTube}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded border-none hover:bg-blue-700"
              >
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
