import customFetch from "../../data/axios";
import { clearFieldValues } from "./fieldSlice";

export const getAllFieldsThunk = async (_, thunkAPI) => {
  const { search, page, size } = thunkAPI.getState().fields;
  let url = `/fields?page=${page}&size=${size}`;
  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};

export const addFieldThunk = async (field, thunkAPI) => {
  try {
    const resp = await customFetch.post("/fields", field);
    thunkAPI.dispatch(clearFieldValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};

export const updateFieldThunk = async ({ fieldId, field }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/fields/${fieldId}`, field);
    thunkAPI.dispatch(clearFieldValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};
