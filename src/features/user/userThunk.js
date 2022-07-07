import { signInWithEmailAndPassword } from "firebase/auth";
import customFetch, { checkForUnauthorizedResponse } from "../../data/axios";
import { auth } from "../../data/firebase";
import { firebaseAuthError } from "../../data/firebaseError";
import { clearBookingDetailValues } from "../bookingdetail/bookingDetailSlice";
import { clearFeedbackValues } from "../feedback/feedbackSlice";
import { clearFieldValues } from "../field/fieldSlice";
import { clearSlotValues } from "../slot/slotSlice";
import { clearUserLoginValues, logoutUser } from "./userSlice";

export const loginUserThunk = async ({ email, password }, thunkAPI) => {
  try {
    const authUser = await signInWithEmailAndPassword(auth, email, password);
    return authUser.user.toJSON();
  } catch (error) {
    return thunkAPI.rejectWithValue(firebaseAuthError(error.code));
  }
};

export const getUserThunk = async (_, thunkAPI) => {
  try {
    const user = await customFetch.post("/api/users/login");
    thunkAPI.dispatch(clearUserLoginValues());
    return user.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearFieldValues());
    thunkAPI.dispatch(clearSlotValues());
    thunkAPI.dispatch(clearFeedbackValues());
    thunkAPI.dispatch(clearBookingDetailValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
