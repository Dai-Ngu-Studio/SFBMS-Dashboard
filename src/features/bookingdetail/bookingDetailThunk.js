import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";

export const getAllBookingDetailsThunk = async (_, thunkAPI) => {
  const { page, size } = thunkAPI.getState().bookingDetails;
  let url = `/odata/bookingdetails?$count=true&$skip=${
    size * (page - 1)
  }&$top=${size}&$expand=User,Field`;

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateBookkingDetailThunk = async (
  { bookingDetailId, bookingDetail },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/odata/bookingdetails/${bookingDetailId}`,
      bookingDetail
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
