import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  loading: false,
  error: null,
};

const nowPlayingMovie = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = nowPlayingMovie.actions;

export default nowPlayingMovie.reducer;
