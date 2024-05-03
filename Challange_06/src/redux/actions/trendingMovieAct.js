import axios from "axios";
import { setMovies } from "../reducers/trendingMovieRdc";

// Action to fetch now playing movies
export const getTrendingMovies = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?language=id-ID",
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI0NWY0MWU1ZDc1ZDEyM2VjY2IyNDM1ZjY2YzQ0YyIsInN1YiI6IjY1ZmQ0NmMxMjI2YzU2MDE3ZDZlZTNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epFMlhG3aQpOxVjyJ35IToRB5BLvjTsMZbRIRCXffR0",
        },
      }
    );
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
