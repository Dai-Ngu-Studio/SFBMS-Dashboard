import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import fieldSlice from "./features/field/fieldSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import slotSlice from "./features/slot/slotSlice";
import feedbackSlice from "./features/feedback/feedbackSlice";
import bookingDetailSlice from "./features/bookingdetail/bookingDetailSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedSlice = persistReducer(persistConfig, fieldsSlice);

export const store = configureStore({
  reducer: {
    fields: fieldSlice,
    categories: categorySlice,
    slots: slotSlice,
    feedbacks: feedbackSlice,
    bookingDetails: bookingDetailSlice,
  },
});
