import {
  getAllBookingDetailsThunk,
  updateBookkingDetailThunk,
} from "./bookingDetailThunk";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isBookingDetailLoading: false,
  isBookingDetailEditing: false,
  editBookingDetailId: 0,
  bookingId: 0,
  startTime: 0,
  userId: 0,
  fieldId: 0,
  endTime: 0,
  status: 0,
  price: 0,
  slotNumber: 0,
  page: 1,
  numOfBookingDetailPages: 1,
  size: 10,
  bookingDetails: [],
};

export const getAllBookingDetails = createAsyncThunk(
  "bookingDetails/getBookingDetails",
  getAllBookingDetailsThunk
);
export const updateBookkingDetai = createAsyncThunk(
  "bookingDetails/updateBookingDetail",
  updateBookkingDetailThunk
);

const bookingDetailSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    handleBookingDetailChange: (state, { name, value }) => {
      state[name] = value;
    },
    changeBookingDetailPage: (state, { payload }) => {
      state.page = payload;
    },
    clearBookingDetailValues: () => {
      return { ...initialState };
    },
    setUpdateBookingDetail: (state, { payload }) => {
      return { ...state, isBookingDetailEditing: true, ...payload };
    },
  },
  extraReducers: {
    [getAllBookingDetails.pending]: (state) => {
      state.isBookingDetailLoading = true;
    },
    [getAllBookingDetails.fulfilled]: (state, { payload }) => {
      state.isBookingDetailLoading = false;
      state.bookingDetails = payload.bookingDetails;
      state.numOfBookingDetailPages = payload.numOfBookingDetailPages;
    },
    [getAllBookingDetails.rejected]: (state, { payload }) => {
      state.isBookingDetailLoading = false;
      toast.error(payload);
    },
    [updateBookkingDetai.pending]: (state) => {
      state.isBookingDetailLoading = true;
    },
    [updateBookkingDetai.fulfilled]: (state) => {
      state.isBookingDetailLoading = false;
      toast.success("Booking Detail Modified...");
    },
    [updateBookkingDetai.rejected]: (state, { payload }) => {
      state.isBookingDetailLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleBookingDetailChange,
  changeBookingDetailPage,
  clearBookingDetailValues,
  setUpdateBookingDetail,
} = bookingDetailSlice.actions;
export default bookingDetailSlice.reducer;
