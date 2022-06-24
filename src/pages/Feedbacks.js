import React from "react";
import { Header, Paging, Search, TableFeedbacks } from "../components";
import { useSelector } from "react-redux";
import {
  changeFeedbackPage,
  handleFeedbackChange,
} from "../features/feedback/feedbackSlice";

const Feedbacks = () => {
  const { isFeedbackLoading, page, numOfFeedbackPages, search } = useSelector(
    (store) => store.feedbacks
  );
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl">
      <Header category="Page" title="Feedbacks" />
      <Search
        handleSearchChange={handleFeedbackChange}
        loading={isFeedbackLoading}
        search={search}
      />
      <TableFeedbacks />
      {numOfFeedbackPages > 1 && (
        <Paging
          numOfPages={numOfFeedbackPages}
          page={page}
          handleChangePage={changeFeedbackPage}
        />
      )}
    </div>
  );
};

export default Feedbacks;
