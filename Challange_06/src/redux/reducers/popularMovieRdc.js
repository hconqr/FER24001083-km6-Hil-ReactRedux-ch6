import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  error: null,
  language: "",
  page: "",
  region: "",
};

const popularMovie = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
  },
});

export const { setMovies, setLanguage, setPage, setRegion } =
  popularMovie.actions;

export default popularMovie.reducer;
