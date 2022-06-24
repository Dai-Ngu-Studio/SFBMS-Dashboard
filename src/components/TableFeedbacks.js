import React, { useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllFeedbacks,
  setUpdateFeedback,
} from "../features/feedback/feedbackSlice";

const TableFeedbacks = () => {
  const { isFeedbackLoading, feedbacks, search, page } = useSelector(
    (store) => store.feedbacks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [search, page]);

  if (isFeedbackLoading) {
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
              Field
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={feedback.id}
              >
                <td className="px-6 py-4">
                  {moment(feedback.feedbackTime).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">{feedback.field.name}</td>
                <td className="px-6 py-4">{feedback.title}</td>
                <td className="px-6 py-4">{feedback.user.name}</td>
                <td className="px-6 py-4">{feedback.rating}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/feedback-form"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch(
                        setUpdateFeedback({
                          editFeedbackId: feedback.id,
                          userId: feedback.userId,
                          fieldId: feedback.fieldId,
                          title: feedback.title,
                          content: feedback.content,
                          rating: feedback.rating,
                          feedbackTime: feedback.feedbackTime,
                          field: feedback.field,
                        })
                      )
                    }
                  >
                    Detail
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

export default TableFeedbacks;
