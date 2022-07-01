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
  userId: "",
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
export const updateBookingDetail = createAsyncThunk(
  "bookingDetails/updateBookingDetail",
  updateBookkingDetailThunk
);

const bookingDetailSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    handleBookingDetailChange: (state, { payload: { name, value } }) => {
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
      state.bookingDetails = payload.value;
      state.numOfBookingDetailPages = Math.floor(
        (payload["@odata.count"] - 1) / state.size + 1
      );
    },
    [getAllBookingDetails.rejected]: (state, { payload }) => {
      state.isBookingDetailLoading = false;
      toast.error(payload);
    },
    [updateBookingDetail.pending]: (state) => {
      state.isBookingDetailLoading = true;
    },
    [updateBookingDetail.fulfilled]: (state) => {
      state.isBookingDetailLoading = false;
      toast.success("Booking Detail Modified...");
    },
    [updateBookingDetail.rejected]: (state, { payload }) => {
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
