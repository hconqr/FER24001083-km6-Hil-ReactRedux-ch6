import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../../redux/actions/trendingMovieAct";
import { setId } from "../../redux/reducers/detailMovieRdc";
import NoImage from "../assets/notFound_BG.jpg";
import Navbar from "../../Pages/Navbar";
import Footer from "../../Pages/Footer";

export default function TrendingMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trendingMovie?.movies);

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, []);

  return (
    <div className="bg-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 text-justify bg-gray-800">
        <h1 className="text-3xl font-bold text-white py-10 flex justify-center">
          Trending Movies
        </h1>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="mb-10 bg-white border p-4 rounded-lg shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onClick={() =>
                  navigate("/movie-detail", dispatch(setId(item?.id)))
                }
              >
                <h2 className="text-xl font-semibold mb-2 cursor-pointer">
                  {item.title || item.name}
                </h2>
                <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                  <img
                    className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                    src={
                      item.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                        : NoImage
                    }
                    alt=""
                  />
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : NoImage
                    }
                    alt={item.title}
                    className="max-w-44 rounded-sm"
                  />
                </div>
                <p className="text-gray-700 mt-5">{item.overview}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
