import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addFieldThunk,
  getAllFieldsThunk,
  updateFieldThunk,
} from "./fieldThunk";

const initialState = {
  isFieldLoading: false,
  fields: [],
  slots: [],
  numOfFieldPages: 1,
  page: 1,
  size: 10,
  search: "",
  isEditing: false,
  editFieldId: "",
  name: "",
  description: "",
  imageUrl: "",
  categoryId: 0,
  numberOfSlots: 0,
  price: 0,
  totalRating: 0,
};

export const getAllFields = createAsyncThunk(
  "fields/getFields",
  getAllFieldsThunk
);
export const addField = createAsyncThunk("fields/addField", addFieldThunk);
export const updateField = createAsyncThunk(
  "fields/updateField",
  updateFieldThunk
);

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    handleFieldChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    handleFieldImageInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFieldValues: () => {
      return {
        ...initialState,
      };
    },
    // Because index page is field page
    clearInputFieldValues: (state) => {
      return {
        ...state,
        slots: [],
        search: "",
        isEditing: false,
        editFieldId: "",
        name: "",
        description: "",
        imageUrl: "",
        categoryId: 0,
        numberOfSlots: 0,
        price: 0,
        totalRating: 0,
      };
    },
    setUpdateField: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    changeFieldPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [getAllFields.pending]: (state) => {
      state.isFieldLoading = true;
    },
    [getAllFields.fulfilled]: (state, { payload }) => {
      state.isFieldLoading = false;
      state.fields = payload.fields;
      state.numOfFieldPages = payload.numOfFieldPages;
    },
    [getAllFields.rejected]: (state, { payload }) => {
      state.isFieldLoading = false;
      toast.error(payload);
    },
    [addField.pending]: (state) => {
      state.isFieldLoading = true;
    },
    [addField.fulfilled]: (state) => {
      state.isFieldLoading = false;
      toast.success("Field Added");
    },
    [addField.rejected]: (state, { payload }) => {
      state.isFieldLoading = false;
      toast.error(payload);
    },
    [updateField.pending]: (state) => {
      state.isFieldLoading = true;
    },
    [updateField.fulfilled]: (state) => {
      state.isFieldLoading = false;
      toast.success("Field Modified...");
    },
    [updateField.rejected]: (state, { payload }) => {
      state.isFieldLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleFieldChange,
  clearFieldValues,
  setUpdateField,
  changeFieldPage,
  clearInputFieldValues,
  handleFieldImageInput,
} = fieldSlice.actions;
export default fieldSlice.reducer;
