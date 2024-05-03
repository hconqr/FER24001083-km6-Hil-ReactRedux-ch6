import axios from "axios";
import { setEmail, setPassword, setToken } from "../reducers/loginRdc";

// Action to fetch now playing movies
export const login =
  (email, password, navigate) => async (dispatch, getState) => {
    try {
      const response_login = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: email,
          password: password,
          expiresInMins: 0.1, // optional, defaults to 60
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response_login?.status === 200) {
        navigate("/");
        console.log("Data", response_login.data);
        const isiToken = response_login.data?.data?.token;
        dispatch(setToken(isiToken));
        alert("Berhasil login");
        return { status: 200 }; // Return status for successful login
      } else {
        alert("password atau username salah");
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      return { status: 500 }; // Return status for internal server error
    }
  };
