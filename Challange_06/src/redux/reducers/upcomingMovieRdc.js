import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  loading: false,
  error: null,
  page: 1,
};

const upcomingMovie = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setPage: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies, setPage } = upcomingMovie.actions;

export default upcomingMovie.reducer;
