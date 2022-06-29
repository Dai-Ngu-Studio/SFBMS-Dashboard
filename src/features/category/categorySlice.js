import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCategoriesThunk } from "./categoryThunk";

const initialState = {
  isCategoryLoading: false,
  categories: [],
};

export const getAllCategories = createAsyncThunk(
  "categories/getCategories",
  getAllCategoriesThunk
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isCategoryLoading = true;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.isCategoryLoading = false;
      state.categories = payload.categories;
    },
    [getAllCategories.rejected]: (state, { payload }) => {
      state.isCategoryLoading = false;
      toast.error(payload);
    },
  },
});

export default categorySlice.reducer;
