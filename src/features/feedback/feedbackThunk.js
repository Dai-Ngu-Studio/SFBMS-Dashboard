import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";

export const getAllFeedbacksThunk = async (_, thunkAPI) => {
  const { page, size, search } = thunkAPI.getState().feedbacks;
  let url = `/odata/feedbacks?$count=true&$skip=${
    size * (page - 1)
  }&$top=${size}&$expand=User,Field`;
  if (search) {
    url = url + `&$filter=contains(tolower(title),tolower('${search}'))`;
  }

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
