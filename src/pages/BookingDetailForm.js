import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormRow,
  FormRowDate,
  FormRowSelect,
  FormRowTime,
  Header,
} from "../components";
import {
  handleBookingDetailChange,
  updateBookingDetail,
} from "../features/bookingdetail/bookingDetailSlice";
import moment from "moment";
import { bookingDetailStatus } from "../data/dummy";

const BookingDetailForm = () => {
  const {
    isBookingDetailLoading,
    isBookingDetailEditing,
    editBookingDetailId,
    bookingId,
    startTime,
    userId,
    fieldId,
    endTime,
    status,
    price,
    slotNumber,
  } = useSelector((store) => store.bookingDetails);
  const dispatch = useDispatch();

  const handleBookingDetailInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleBookingDetailChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tmpStatus = parseInt(status);
    let tmpStartTime = moment(startTime).toISOString(true);
    let tmpEndTime = moment(endTime).toISOString(true);

    if (isBookingDetailEditing) {
      dispatch(
        updateBookingDetail({
          bookingDetailId: editBookingDetailId,
          bookingDetail: {
            bookingId,
            startTime: tmpStartTime,
            endTime: tmpEndTime,
            price,
            slotNumber,
            fieldId,
            userId,
            status: tmpStatus,
          },
        })
      );
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl">
      <Header category="Page" title="Feedback Details" />
      <form>
        {/* Field */}
        <FormRow
          type="text"
          name="fieldId"
          labelText="Field ID"
          value={fieldId}
          disabled={isBookingDetailEditing}
          handleChange={handleBookingDetailInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Date*/}
        <FormRowDate
          type="text"
          name="startTime"
          labelText="Date"
          value={startTime}
          disabled={isBookingDetailEditing}
          handleChange={handleBookingDetailInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Start Time */}
        <FormRowTime
          name="startTime"
          type="text"
          value={startTime}
          labelText="Start Time"
          disabled={isBookingDetailEditing}
          handleChange={handleBookingDetailInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* End Time */}
        <FormRowTime
          name="endTime"
          type="text"
          value={endTime}
          labelText="End Time"
          disabled={isBookingDetailEditing}
          handleChange={handleBookingDetailInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Status */}
        <FormRowSelect
          name="status"
          labelText="Status"
          value={status}
          handleChange={handleBookingDetailInput}
          list={bookingDetailStatus}
        />
        <div className="flex items-start mb-2"></div>
        <button
          type="submit"
          disabled={isBookingDetailLoading}
          onClick={handleSubmit}
          className={
            isBookingDetailLoading
              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }
        >
          {isBookingDetailLoading ? (
            <>
              <svg
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingDetailForm;
