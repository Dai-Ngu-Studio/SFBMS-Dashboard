import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";

export const updateSlotThunk = async ({ slotId, slot }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/odata/slots/${slotId}`, slot);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
