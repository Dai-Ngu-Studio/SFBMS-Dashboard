import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllFeedbacksThunk, getSingleFeedbackThunk } from "./feedbackThunk";

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
export const getSingleFeedback = createAsyncThunk(
  "feedbacks/getSingleFeedback",
  getSingleFeedbackThunk
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
  },
  extraReducers: {
    [getAllFeedbacks.pending]: (state) => {
      state.isFeedbackLoading = true;
    },
    [getAllFeedbacks.fulfilled]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      state.feedbacks = payload.value;
      state.numOfFeedbackPages = Math.floor(
        (payload["@odata.count"] - 1) / state.size + 1
      );
    },
    [getAllFeedbacks.rejected]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      toast.error(payload);
    },
    [getSingleFeedback.pending]: (state) => {
      state.isFeedbackLoading = true;
      state.isFeedbackEditing = true;
    },
    [getSingleFeedback.fulfilled]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      state.editFeedbackId = payload.id;
      state.userId = payload.userId;
      state.feedbackTime = payload.feedbackTime;
      state.fieldId = payload.fieldId;
      state.title = payload.title;
      state.content = payload.content;
      state.rating = payload.rating;
      state.field = payload.field;
    },
    [getSingleFeedback.rejected]: (state, { payload }) => {
      state.isFeedbackLoading = false;
      state.isFeedbackEditing = false;
      toast.error(payload);
    },
  },
});

export const { handleFeedbackChange, clearFeedbackValues, changeFeedbackPage } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
