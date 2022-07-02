import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormRow,
  FormRowArea,
  FormRowDate,
  Header,
  Loading,
} from "../components";
import { handleFeedbackChange } from "../features/feedback/feedbackSlice";

const FeedbackForm = () => {
  const {
    isFeedbackEditing,
    isFeedbackLoading,
    fieldId,
    userId,
    feedbackTime,
    title,
    content,
    rating,
    field,
    editFeedbackId,
  } = useSelector((store) => store.feedbacks);
  const dispatch = useDispatch();

  const handleFeedbackInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleFeedbackChange({ name, value }));
  };

  if (isFeedbackLoading) {
    return <Loading />;
  }

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl">
      <Header category="Page" title="Feedback Details" />
      <>
        {/* Field */}
        <FormRow
          type="text"
          name="field"
          labelText="Field"
          value={field.name}
          disabled={isFeedbackEditing}
          handleChange={handleFeedbackInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Date*/}
        <FormRowDate
          type="text"
          name="feedbackTime"
          labelText="Date"
          value={feedbackTime}
          disabled={isFeedbackEditing}
          handleChange={handleFeedbackInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Title */}
        <FormRow
          name="title"
          type="text"
          value={title}
          labelText="Title"
          disabled={isFeedbackEditing}
          handleChange={handleFeedbackInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Content */}
        <FormRowArea
          name="cotent"
          type="text"
          value={content}
          labelText="Content"
          disabled={isFeedbackEditing}
          handleChange={handleFeedbackInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Rating */}
        <FormRow
          type="number"
          name="rating"
          labelText="Rating"
          value={rating}
          disabled={isFeedbackEditing}
          handleChange={handleFeedbackInput}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </>
    </div>
  );
};

export default FeedbackForm;
