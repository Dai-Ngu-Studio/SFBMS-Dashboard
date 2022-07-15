import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from ".";
import {
  getAllFields,
  getSingleField,
  setUpdateField,
} from "../features/field/fieldSlice";

const TableFields = () => {
  const { isFieldLoading, fields, search, page } = useSelector(
    (store) => store.fields
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFields());
  }, [search, page]);

  if (isFieldLoading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <Link to="/field-form">Add</Link>
      </button>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Price
            </th> */}
            <th scope="col" className="px-6 py-3">
              Number Of Slots
            </th>
            <th scope="col" className="px-6 py-3">
              Total Rating
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={field.id}
              >
                <td className="px-6 py-4">{field.name}</td>
                <td className="px-6 py-4">
                  {field.description.length > 100
                    ? field.description.substring(0, 100) + " ..."
                    : field.description}
                </td>
                <td className="px-6 py-4">{field.category.name}</td>
                {/* <td className="px-6 py-4">{field.price}</td> */}
                <td className="px-6 py-4">{field.numberOfSlots}</td>
                <td className="px-6 py-4">{field.totalRating}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/field-form"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch(
                        setUpdateField({
                          editFieldId: field.id,
                          name: field.name,
                          numberOfSlots: field.numberOfSlots,
                          categoryId: field.categoryId,
                          description: field.description,
                          price: field.price,
                          totalRatin: field.totalRating,
                          slots: field.slots,
                          imageUrl: field.imageUrl,
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

export default TableFields;
