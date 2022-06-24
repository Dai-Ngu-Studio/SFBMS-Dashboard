import customFetch from "../../data/axios";

export const getAllBookingDetailsThunk = async (_, thunkAPI) => {
  const { page, size } = thunkAPI.getState().bookingDetails;
  let url = `/bookingdetails?${page}&size=${size}`;

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue("There was an error");
  }
};

export const updateBookkingDetailThunk = async (
  { bookingDetailId, bookingDetail },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/bookingdetails/${bookingDetailId}`,
      bookingDetail
    );
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue("There was an error");
  }
};
