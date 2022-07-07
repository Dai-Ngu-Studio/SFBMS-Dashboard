import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addFieldThunk,
  getAllFieldsThunk,
  getSingleFieldThunk,
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
  numberOfSlots: 8,
  price: 0,
  totalRating: 0,
};

export const getAllFields = createAsyncThunk(
  "fields/getFields",
  getAllFieldsThunk
);
export const getSingleField = createAsyncThunk(
  "fields/getField",
  getSingleFieldThunk
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
    setUpdateField: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
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
      state.fields = payload.value;
      state.numOfFieldPages = Math.floor(
        (payload["@odata.count"] - 1) / state.size + 1
      );
    },
    [getAllFields.rejected]: (state, { payload }) => {
      state.isFieldLoading = false;
      toast.error(payload);
    },
    [getSingleField.pending]: (state) => {
      state.isFieldLoading = true;
      state.isEditing = true;
    },
    [getSingleField.fulfilled]: (state, { payload }) => {
      state.isFieldLoading = false;
      state.editFieldId = payload.id;
      state.name = payload.name;
      state.numberOfSlots = payload.numberOfSlots;
      state.categoryId = payload.categoryId;
      state.description = payload.description;
      state.price = payload.price;
      state.totalRating = payload.totalRating;
      state.slots = payload.slots;
      state.imageUrl = payload.imageUrl;
    },
    [getSingleField.rejected]: (state, { payload }) => {
      state.isFieldLoading = false;
      state.isEditing = false;
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
  changeFieldPage,
  clearInputFieldValues,
  handleFieldImageInput,
  setUpdateField,
} = fieldSlice.actions;
export default fieldSlice.reducer;
