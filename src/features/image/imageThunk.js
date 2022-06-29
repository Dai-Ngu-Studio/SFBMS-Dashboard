import { fileFetch } from "../../data/axios";

export const getImageThunk = async ({ tmpImage }, thunkAPI) => {
  try {
    const resp = await fileFetch.post("/api/cloud/image", tmpImage);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};
