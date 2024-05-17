import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  language: "",
  detail: null,
  reviews: null,
  id: null,
  trailer: null,
};

const theMovie = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setlanguage: (state, action) => {
      state.language = action.payload;
    },
    setTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export const {
  setMovies,
  setDetail,
  setReviews,
  setId,
  setlanguage,
  setTrailer,
} = theMovie.actions;

export default theMovie.reducer;
