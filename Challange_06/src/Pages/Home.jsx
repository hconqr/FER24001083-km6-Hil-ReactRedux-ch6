import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies } from "../redux/actions/nowPlayingMovieAct";
import { setId } from "../redux/reducers/detailMovieRdc";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.nowPlaying?.movies);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Now Playing Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data &&
              data.slice(0, 8).map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  onClick={() => {
                    dispatch(setId(movie?.id));
                    navigate("/movie-detail");
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[1000px] h-auto object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                      {movie.title}
                    </h2>
                    <p className="text-gray-500 mb-4">
                      Release Date: {movie.release_date}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Rating: {movie.vote_average}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/movie-now"
              className="bg-gray-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded inline-block"
            >
              Lihat Semua Now Playing Movies
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
