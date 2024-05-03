import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  loading: false,
  error: null,
};

const trendingMovies = createSlice({
  name: "trending",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = trendingMovies.actions;

export default trendingMovies.reducer;
