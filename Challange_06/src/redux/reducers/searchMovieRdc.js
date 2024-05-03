import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  error: null,
  language: "",
  query: "",
  year: "",
};

const searchMovie = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setMovies, setLanguage, setQuery, setYear } =
  searchMovie.actions;

export default searchMovie.reducer;
