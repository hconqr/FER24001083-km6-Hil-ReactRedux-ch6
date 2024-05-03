import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import detailMovieRdc from "./reducers/detailMovieRdc";
import nowPlayingMovieRdc from "./reducers/nowPlayingMovieRdc";
import favMovieRdc from "./reducers/favMovieRdc";
import trendingMoviesRdc from "./reducers/trendingMovieRdc";
import popularMovieRdc from "./reducers/popularMovieRdc";
import searchMovieRdc from "./reducers/searchMovieRdc";
import loginRdc from "./reducers/loginRdc";

const rootReducers = combineReducers({
  detail: detailMovieRdc,
  nowPlaying: nowPlayingMovieRdc,
  favMovie: favMovieRdc,
  trendingMovie: trendingMoviesRdc,
  popularMovie: popularMovieRdc,
  searchMovie: searchMovieRdc,
  login: loginRdc,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
