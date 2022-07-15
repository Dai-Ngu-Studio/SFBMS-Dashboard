import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Header,
  FormRow,
  FormRowArea,
  FormRowSelect,
  Loading,
  FormRowFile,
} from "../components";
import { slotNumberList } from "../data/dummy";
import { getAllCategories } from "../features/category/categorySlice";
import {
  addField,
  clearFieldValues,
  handleFieldChange,
  handleFieldImageInput,
  updateField,
} from "../features/field/fieldSlice";
import { changeImageLoading, getImage } from "../features/image/imageSlice";
import { setUpdateSlot } from "../features/slot/slotSlice";

const FieldForm = () => {
  const {
    isFieldLoading,
    isEditing,
    editFieldId,
    description,
    categoryId,
    name,
    numberOfSlots,
    totalRating,
    price,
    slots,
    imageUrl,
  } = useSelector((store) => store.fields);
  const { image, isGetImageLoading, isImageEditing } = useSelector(
    (store) => store.image
  );
  const { isCategoryLoading, categories } = useSelector(
    (store) => store.categories
  );
  const dispatch = useDispatch();
  const [imageFirstValue, setImageFirstValue] = useState(imageUrl);

  const handleFieldInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleFieldChange({ name, value }));
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const value = await convertToBase64(file);
    dispatch(handleFieldImageInput({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !numberOfSlots || !description) {
      toast.error("Please fill out all fields");
      return;
    }
    // if (price < 0) {
    //   toast.warning("Please enter above 0");
    //   return;
    // }

    if (isEditing) {
      if (imageUrl !== imageFirstValue) {
        dispatch(getImage({ tmpImage: imageUrl }));
        return;
      }
      dispatch(changeImageLoading());
      return;
    }
    dispatch(getImage({ tmpImage: imageUrl }));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    let tmpPrice = parseFloat(price);
    let tmpCategory;
    if (parseInt(categoryId) === 0) {
      if (categories.length > 0) {
        tmpCategory = categories[0].id;
      }
    } else {
      tmpCategory = parseInt(categoryId);
    }
    let tmpNumberOfSlots = parseInt(numberOfSlots);
    let tmpTotalRating = parseInt(totalRating);
    if (isEditing) {
      if (image !== "" || isImageEditing) {
        dispatch(
          updateField({
            fieldId: editFieldId,
            field: {
              name,
              description,
              categoryId: tmpCategory,
              price: tmpPrice,
              numberOfSlots: tmpNumberOfSlots,
              totalRating: tmpTotalRating,
              imageUrl: image !== "" ? image : imageUrl,
            },
          })
        );
        return;
      }
    }
    if (image !== "") {
      dispatch(
        addField({
          name,
          description,
          categoryId: tmpCategory,
          price: 10000,
          numberOfSlots: tmpNumberOfSlots,
          imageUrl: image,
        })
      );
    }
  }, [isGetImageLoading]);

  if (isCategoryLoading) {
    return <Loading />;
  }

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl">
      {isEditing ? (
        <Header category="Page" title="Edit Fields" />
      ) : (
        <Header category="Page" title="Add Fields" />
      )}
      <form>
        {/* Image */}
        <FormRowFile
          type="file"
          name="imageUrl"
          value={imageUrl}
          handleChange={handleFileUpload}
        />
        {/* Name */}
        <FormRow
          type="text"
          name="name"
          labelText="Field Name"
          value={name}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          handleChange={handleFieldInput}
        />
        {/* Description */}
        <FormRowArea
          name="description"
          labelText="Description"
          value={description}
          handleChange={handleFieldInput}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Category */}
        <FormRowSelect
          name="categoryId"
          labelText="Category"
          value={categoryId}
          handleChange={handleFieldInput}
          list={categories}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* Price */}
        {/* <FormRow
          name="price"
          type="number"
          value={price}
          labelText="Price"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          handleChange={handleFieldInput}
        /> */}
        {/* Number Of Slots */}
        <FormRowSelect
          name="numberOfSlots"
          value={numberOfSlots}
          labelText="Number Of Slots"
          disabled={isEditing}
          className={
            isEditing
              ? "mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              : "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          }
          handleChange={handleFieldInput}
          list={slotNumberList}
        />
        {isEditing && (
          <FormRow
            name="totalRating"
            type="number"
            value={totalRating}
            className={
              isEditing
                ? "mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            }
            labelText="Total Rating"
            disabled={isEditing}
            handleChange={handleFieldInput}
          />
        )}
        <div className="flex items-start mb-2"></div>
        <button
          type="submit"
          disabled={isFieldLoading}
          onClick={handleSubmit}
          className={
            isFieldLoading
              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }
        >
          {isFieldLoading ? (
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
        <button
          type="button"
          disabled={isFieldLoading}
          onClick={() => dispatch(clearFieldValues())}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
        >
          Clear
        </button>
      </form>
      <div className="flex items-start mb-6"></div>
      {slots.map((slot) => {
        return (
          <Link
            to="/slot-form"
            key={slot.id}
            onClick={() =>
              dispatch(
                setUpdateSlot({
                  editSlotId: slot.id,
                  fieldId: slot.fieldId,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                  status: slot.status,
                  slotNumber: slot.slotNumber,
                })
              )
            }
            className="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          >
            {slot.slotNumber + ".   "}
            {moment(slot.startTime).format("HH:mm:ss") +
              " - " +
              moment(slot.endTime).format("HH:mm:ss")}
          </Link>
        );
      })}
    </div>
  );
};

export default FieldForm;
