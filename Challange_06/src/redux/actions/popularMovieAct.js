import axios from "axios";
import {
  setMovies,
  setLanguage,
  setPage,
  setRegion,
} from "../reducers/popularMovieRdc";

// Action to fetch now playing movies
export const moviesPopular = () => async (dispatch, getState) => {
  const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";
  const language = getState().popularMovie.language;
  const page = getState().popularMovie.page;
  const region = getState().popularMovie.region;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`,
      { headers: { accept: "application/json" } }
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
