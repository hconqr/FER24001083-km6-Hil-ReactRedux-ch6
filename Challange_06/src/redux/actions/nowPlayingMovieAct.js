import axios from "axios";
import { setMovies } from "../reducers/nowPlayingMovieRdc";

// Action to fetch now playing movies
export const fetchNowPlayingMovies = () => async (dispatch, getState) => {
  try {
    // Fetch data from TMDB API with error handling
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=570c36d75740509c00d865a804d826a5&language=en-US&page=1`
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
