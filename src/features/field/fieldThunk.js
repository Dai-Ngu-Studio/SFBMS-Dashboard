import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";
import { clearImageValues } from "../image/imageSlice";
import { clearFieldValues } from "./fieldSlice";

export const getAllFieldsThunk = async (_, thunkAPI) => {
  const { search, page, size } = thunkAPI.getState().fields;
  let url = `/odata/fields?$count=true&$skip=${
    size * (page - 1)
  }&$top=${size}&$expand=Slots,Category`;
  if (search) {
    url = url + `&$filter=contains(tolower(name),tolower('${search}'))`;
  }

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getSingleFieldThunk = async ({ fieldId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/odata/fields/${fieldId}?$expand=Slots`
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const addFieldThunk = async (field, thunkAPI) => {
  try {
    const resp = await customFetch.post("/odata/fields", field);
    thunkAPI.dispatch(clearFieldValues());
    thunkAPI.dispatch(clearImageValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateFieldThunk = async ({ fieldId, field }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/odata/fields/${fieldId}`, field);
    thunkAPI.dispatch(clearFieldValues());
    thunkAPI.dispatch(clearImageValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
