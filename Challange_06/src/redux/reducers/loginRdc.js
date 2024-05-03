import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: null,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.token = null;
    },
  },
});

export const { setEmail, setPassword, setToken, logout } = login.actions;

export default login.reducer;
