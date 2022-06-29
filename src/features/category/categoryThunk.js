import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";

export const getAllCategoriesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/odata/categories");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
