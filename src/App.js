import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import {
  FieldForm,
  Feedbacks,
  Fields,
  SlotForm,
  BookingDetails,
  FeedbackForm,
  BookingDetailForm,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { activeMenu, currentMode } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72 " : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* pages  */}
                <Route path="/" element={<Fields />} />
                <Route path="/fields" element={<Fields />} />
                <Route path="/field-form" element={<FieldForm />} />
                <Route path="/slot-form" element={<SlotForm />} />
                <Route path="/feedback-form" element={<FeedbackForm />} />
                <Route path="/booking-details" element={<BookingDetails />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route
                  path="/bookingdetail-form"
                  element={<BookingDetailForm />}
                />
              </Routes>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
};

export default App;
