import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updateSlotThunk } from "./slotThunk";

const initialState = {
  isSlotLoading: false,
  isSlotEditing: false,
  fieldId: 0,
  startTime: 0,
  endTime: 0,
  status: 0,
  slotNumber: 0,
  editSlotId: "",
};

export const updateSlot = createAsyncThunk(
  "/slots/updateSlot",
  updateSlotThunk
);

const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    handleSlotChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setUpdateSlot: (state, { payload }) => {
      return { ...state, isSlotEditing: true, ...payload };
    },
  },
  extraReducers: {
    [updateSlot.pending]: (state) => {
      state.isSlotLoading = true;
    },
    [updateSlot.fulfilled]: (state) => {
      state.isSlotLoading = false;
      toast.success("Slot Modified...");
    },
    [updateSlot.rejected]: (state, { payload }) => {
      state.isSlotLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleSlotChange, setUpdateSlot } = slotSlice.actions;
export default slotSlice.reducer;
