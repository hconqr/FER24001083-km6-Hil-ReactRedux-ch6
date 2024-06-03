import axios from "axios";
import { setMovies } from "../reducers/upcomingMovieRdc";

// Action to fetch now playing movies
export const getUpcomingMovie = () => async (dispatch, getState) => {
  const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";
  const page = 3;

  try {
    // Fetch data from TMDB API with error handling
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&api_key=${API_KEY}`
    );

    // Ensure response and data are valid before dispatching
    if (response.status === 200 && response.data) {
      const movies = response.data.results;
      dispatch(setMovies(movies)); // Dispatch action with only movie results
    } else {
      console.error("Error fetching data:", response.statusText); // More specific error message
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
