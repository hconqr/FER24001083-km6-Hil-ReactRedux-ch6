import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  language: "",
};

const favMovie = createSlice({
  name: "favMovie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    languageState: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setMovies, languageState } = favMovie.actions;

export default favMovie.reducer;
