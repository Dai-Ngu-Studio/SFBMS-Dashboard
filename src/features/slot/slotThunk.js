import customFetch from "../../data/axios";

export const updateSlotThunk = async ({ slotId, slot }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/slots/${slotId}`, slot);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};
