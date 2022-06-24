import React from "react";
import { Header, Paging, TableBookingDetails } from "../components";
import { useSelector } from "react-redux";
import { changeBookingDetailPage } from "../features/bookingdetail/bookingDetailSlice";

const BookingDetails = () => {
  const { page, numOfBookingDetailPages } = useSelector(
    (store) => store.bookingDetails
  );
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Booking Detail" />
      <TableBookingDetails />
      {numOfBookingDetailPages > 1 && (
        <Paging
          numOfPages={numOfBookingDetailPages}
          page={page}
          handleChangePage={changeBookingDetailPage}
        />
      )}
    </div>
  );
};

export default BookingDetails;
