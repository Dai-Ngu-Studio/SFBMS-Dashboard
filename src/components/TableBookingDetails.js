import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showBookingDetailStatus } from "../data/dummy";
import {
  getAllBookingDetails,
  getSingleBookingDetail,
} from "../features/bookingdetail/bookingDetailSlice";
import Loading from "./Loading";

const TableBookingDetails = () => {
  const { isBookingDetailLoading, bookingDetails, page } = useSelector(
    (store) => store.bookingDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookingDetails());
  }, [page]);

  if (isBookingDetailLoading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Field
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((bookingDetail) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={bookingDetail.id}
              >
                <td className="px-6 py-4">
                  {moment(bookingDetail.startTime).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  {moment(bookingDetail.startTime).format("HH:mm:ss") +
                    " - " +
                    moment(bookingDetail.endTime).format("HH:mm:ss")}
                </td>
                <td className="px-6 py-4">{bookingDetail.field.name}</td>
                <td className="px-6 py-4">{bookingDetail.user.name}</td>
                <td className="px-6 py-4">
                  {showBookingDetailStatus(bookingDetail.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/bookingdetail-form"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch(
                        getSingleBookingDetail({
                          bookingDetailId: bookingDetail.id,
                        })
                      )
                    }
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableBookingDetails;
