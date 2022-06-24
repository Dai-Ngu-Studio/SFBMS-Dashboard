import customFetch from "../../data/axios";

export const getAllFeedbacksThunk = async (_, thunkAPI) => {
  const { page, size, search } = thunkAPI.getState().feedbacks;
  let url = `/feedbacks?page=${page}&size=${size}`;
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
