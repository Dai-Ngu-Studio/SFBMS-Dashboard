import customFetch from "../../data/axios";

export const getAllCategoriesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/categories");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};
