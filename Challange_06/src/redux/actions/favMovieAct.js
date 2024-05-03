import axios from "axios";
import { setMovies, languageState } from "../reducers/favMovieRdc"; // Mengimpor fungsi action yang benar dari reducer favMovieRdc

export const fetchFavoriteMovies = () => async (dispatch, getState) => {
  const ACC_ID = "21134706";
  const language = getState().favMovie.language;
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmIyYTUwMjUwZGUwYjczMDZiNzZhMzZjNTEwMjllOCIsInN1YiI6IjY2MDEyMzEyN2Y2YzhkMDE2MzZmZDQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owhLgAWxk1jrcJHXp2KuqjPgImpP1fch2iCpz-dOLj8";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ACC_ID}/favorite/movies?language=${language}&page=1&sort_by=created_at.asc`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data) {
      dispatch(setMovies(response.data.results)); // Memanggil action creator favoriteMoviesLoaded dengan data hasil
    } else {
      throw new Error("Error fetching favorite movies: " + response.statusText); // Melemparkan error khusus jika respons tidak berhasil
    }
  } catch (error) {
    throw error; // Melemparkan kembali error untuk penanganan di reducer
  }
};
