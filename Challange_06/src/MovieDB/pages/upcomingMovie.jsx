import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUpcomingMovie } from "../../redux/actions/upcomingMovieAct";
import { setId } from "../../redux/reducers/detailMovieRdc";
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
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
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
          <Link
            to={`/upcoming`}
            className="text-white bg-blue-600 hover:bg-red-500 p-2 rounded"
          >
            Upcoming
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

export default function UpcomingMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.upcomingMovie?.movies);
  console.log("data", data);

  const statenya = useSelector((state) => state);
  console.log("statenya", statenya);

  useEffect(() => {
    dispatch(getUpcomingMovie());
  }, []);

  const handleNextPage = () => {};

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 text-justify">
        <h1 className="text-3xl font-bold my-4">Upcoming Movies</h1>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
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
      </div>{" "}
    </>
  );
}
