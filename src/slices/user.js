import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for Login

const initialState = {
  loading: false,
  hasError: false,
  userData: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.userData = payload;
    },
    getUserFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//export aciots
export const { getUser, getUserFailure, getUserSuccess } = userSlice.actions;

//reducers
export default userSlice.reducer;

//selector
export const userSelector = (state) => state.currentUser;

//Thunks
export function getCurrentUser(userToken) {
  return async (dispatch) => {
    dispatch(getUser());

    try {
      const res = await axios.get("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch(getUserSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(getUserFailure(error));
    }
  };
}
