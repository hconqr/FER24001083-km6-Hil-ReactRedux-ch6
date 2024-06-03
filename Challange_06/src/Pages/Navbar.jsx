import React, { useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../redux/actions/searchMovieAct";
import { setQuery } from "../redux/reducers/searchMovieRdc";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/loginRdc";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/movieku.png";

const navigation = [
  { name: "Trending", href: "/movie-trending" },
  { name: "Favorite", href: "/movie-favorite" },
  { name: "Popular", href: "/movie-popular" },
  { name: "Now Playing", href: "/movie-now" },
  { name: "Upcoming", href: "/upcoming" },
  { name: "Search", href: "/movie-search" },
];

export default function Example() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state.searchMovie?.query);

  useEffect(() => {
    dispatch(searchMovie());
  }, []);

  const handleChangeQuery = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const navigate = useNavigate();
  const movieGridRef = useRef(null); // Initialize useRef hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(searchMovie());

    // Check if movieGridRef is not null before calling scrollIntoView
    if (movieGridRef.current) {
      movieGridRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Navigate to /movie-search after searching
    navigate("/movie-search");
  };
  const logoutin = useSelector((state) => state.login?.token);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    alert("Berhasil logout");
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-gray-900 shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center w-[100px]">
                    <a href="/">
                      <img
                        className="block h-auto w-full"
                        src={Logo}
                        alt="logo"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="w-full flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full mr-10 max-sm:mr-0">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative flex ">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          value={searchKeyword}
                          onChange={handleChangeQuery}
                        />
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="justify-center w-[10%] max-sm:w-[20%] ml-3 inline-flex items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cari
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 ">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4 flex justify-center items-center gap-5 max-sm:flex-col ">
                {navigation.map((item) => (
                  <a
                    className="flex flex-col text-white hover:text-red-500"
                    key={item.name}
                    href={item.href}
                  >
                    {item.name}
                  </a>
                ))}
                <div>
                  {/* Check if user is logged in and show appropriate button */}
                  {logoutin ? (
                    <div>
                      <button
                        className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
