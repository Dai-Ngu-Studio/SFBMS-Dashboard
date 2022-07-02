import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearStoreThunk, getUserThunk, loginUserThunk } from "./userThunk";
import { toast } from "react-toastify";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeStateFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../data/localStorage";

const initialState = {
  isUserLoading: false,
  email: "",
  password: "",
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
};

export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const getUser = createAsyncThunk("user/getUser", getUserThunk);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUserChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    toggleRegister: (state) => {
      state.isUserRegistering = !state.isUserRegistering;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      removeStateFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    clearUserLoginValues: (state) => {
      return { ...state, email: "", password: "" };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isUserLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isUserLoading = false;
      state.token = payload.stsTokenManager.accessToken;
      addTokenToLocalStorage(payload.stsTokenManager.accessToken);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isUserLoading = false;
      toast.error(payload);
    },
    [getUser.pending]: (state) => {
      state.isUserLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isUserLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      if (payload.isAdmin === 1) {
        toast.success("Welcome to dashboard!");
      }
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isUserLoading = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error("There was an error...");
    },
  },
});

export const {
  handleUserChange,
  logoutUser,
  toggleRegister,
  clearUserLoginValues,
} = userSlice.actions;
export default userSlice.reducer;
