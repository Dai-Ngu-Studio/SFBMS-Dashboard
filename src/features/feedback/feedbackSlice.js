import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllFeedbacksThunk } from "./feedbackThunk";

const initialState = {
  isFeedbackLoading: false,
  isFeedbackEditing: false,
  feedbacks: [],
  numOfFeedbackPages: 1,
  page: 1,
  size: 10,
  search: "",
  editFeedbackId: 0,
  userId: 0,
  fieldId: 0,
  field: {},
  title: "",
  content: "",
  rating: 0,
  feedbackTime: 0,
};

export const getAllFeedbacks = createAsyncThunk(
  "feedbacks/getFeedbacks",
  getAllFeedbacksThunk
);

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    handleFeedbackChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFeedbackValues: () => {
      return { ...initialState };
    },
    changeFeedbackPage: (state, { payload }) => {
      state.page = payload;
    },
    setUpdateFeedback: (state, { payload }) => {
      return {
        ...state,
        isFeedbackEditing: true,
        ...payload,
      };
    },
  },
  extraReducers: {
    [getAllFeedbacks.pending]: (state) => {
      state.isFeedbackLoading = true;
    },
    [getAllFeedbacks.fulfilled]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      state.feedbacks = payload.feedbacks;
      state.numOfFeedbackPages = payload.numOfFeedbackPages;
    },
    [getAllFeedbacks.rejected]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleFeedbackChange,
  clearFeedbackValues,
  setUpdateFeedback,
  changeFeedbackPage,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
