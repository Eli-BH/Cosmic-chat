import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for Login

const initialState = {
  loading: false,
  hasError: "",
  authData: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.authData = payload;
      localStorage.setItem("cosmicUser", payload);
    },
    loginFailure: (state, { payload }) => {
      state.loading = false;
      state.hasError = payload;
    },
    register: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.authData = payload;
      localStorage.setItem("cosmicUser", payload);
    },
    registerFailure: (state, { payload }) => {
      state.loading = false;
      state.hasError = payload;
    },
    logout: (state) => {
      state.authData = "";
      window.localStorage.clear();
    },
  },
});

//export actions if needed
export const {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerFailure,
  registerSuccess,
  logout,
} = authSlice.actions;

//login selector
export const authSelector = (state) => state.authData;

//reducers
export default authSlice.reducer;

//Thunks
export function authLogin(formData) {
  return async (dispatch) => {
    dispatch(login());

    try {
      const { data } = await axios.post(
        "https://cosmic-cord.herokuapp.com/api/auth/login",
        formData
      );

      dispatch(loginSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(loginFailure(error));
    }
  };
}

export function authRegister(formData) {
  return async (dispatch) => {
    dispatch(register());

    try {
      const { data } = await axios.post(
        "https://cosmic-cord.herokuapp.com/api/auth/register",
        formData
      );

      dispatch(registerSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(registerFailure(error));
    }
  };
}
