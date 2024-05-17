import axios from "axios";
import { setDetail, setTrailer, setReviews } from "../reducers/detailMovieRdc"; // Import actions using createSlice naming convention

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    if (response.status === 200 && response.data) {
      dispatch(setDetail(response.data)); // Dispatch action with only movie results
    } else {
      console.error("Error fetching data:", response.statusText); // More specific error message
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchMovieReviews = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    if (response.status === 200 && response.data) {
      dispatch(setReviews(response.data));
    } else {
      console.error("Error fetching data:", response.statusText); // More specific error message
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTrailer = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    if (response.status === 200 && response.data) {
      dispatch(setTrailer(response.data));
    } else {
      console.error("Error fetching data:", response.statusText); // More specific error message
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
