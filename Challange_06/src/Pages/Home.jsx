import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies } from "../redux/actions/nowPlayingMovieAct";
import { setId } from "../redux/reducers/detailMovieRdc";
import { logout } from "../redux/reducers/loginRdc";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statenya = useSelector((state) => state);
  console.log("statenya", statenya);

  const logoutin = useSelector((state) => state.login?.token);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    alert("Berhasil logout");
  };

  return (
    <div className="bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            to={`/`}
            className="text-white bg-blue-600 hover:bg-red-500 p-2 rounded mr-4"
          >
            Home
          </Link>
          {!!logoutin ? (
            <Link
              to={`/movie-trending`}
              className="text-white  hover:bg-red-500 p-2 rounded mr-4"
            >
              Trending
            </Link>
          ) : (
            <Link to={`/login`}></Link>
          )}
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
            className="text-white hover:bg-red-500 p-2 mr-4 rounded"
          >
            Now Playing
          </Link>
          <Link
            to={`/upcoming`}
            className="text-white hover:bg-red-500 p-2 rounded"
          >
            Upcoming
          </Link>
          <Link
            to={`/movie`}
            className="hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
          >
            Cari Movie
          </Link>
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
              to={`/login`}
              className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.nowPlaying?.movies);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
  }, []);

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
                  onClick={() =>
                    navigate("/movie-detail", dispatch(setId(movie?.id)))
                  }
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
    </div>
  );
}
