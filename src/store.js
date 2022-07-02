import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import fieldSlice from "./features/field/fieldSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import slotSlice from "./features/slot/slotSlice";
import feedbackSlice from "./features/feedback/feedbackSlice";
import bookingDetailSlice from "./features/bookingdetail/bookingDetailSlice";
import userSlice from "./features/user/userSlice";
import imageSlice from "./features/image/imageSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFieldSlice = persistReducer(persistConfig, fieldSlice);
const persistedFeedbackSlice = persistReducer(persistConfig, feedbackSlice);
const persistedSlotSlice = persistReducer(persistConfig, slotSlice);
const persistedBookingDetailSlice = persistReducer(
  persistConfig,
  bookingDetailSlice
);

export const store = configureStore({
  reducer: {
    fields: persistedFieldSlice,
    categories: categorySlice,
    slots: persistedSlotSlice,
    feedbacks: persistedFeedbackSlice,
    bookingDetails: persistedBookingDetailSlice,
    user: userSlice,
    image: imageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
