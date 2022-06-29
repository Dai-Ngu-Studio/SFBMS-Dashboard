import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  FieldForm,
  Feedbacks,
  Fields,
  SlotForm,
  BookingDetails,
  FeedbackForm,
  BookingDetailForm,
  Register,
  ProtectedRoute,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import SharedLayout from "./pages/SharedLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* pages  */}
          <Route index element={<Fields />} />
          <Route path="fields" element={<Fields />} />
          <Route path="field-form" element={<FieldForm />} />
          <Route path="slot-form" element={<SlotForm />} />
          <Route path="feedback-form" element={<FeedbackForm />} />
          <Route path="booking-details" element={<BookingDetails />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="bookingdetail-form" element={<BookingDetailForm />} />
        </Route>
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
