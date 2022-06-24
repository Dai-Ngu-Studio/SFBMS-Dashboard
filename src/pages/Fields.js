import React from "react";
import { Header, Search, TableFields, Paging } from "../components";
import { useSelector } from "react-redux";
import { handleFieldChange } from "../features/field/fieldSlice";
import { changeFieldPage } from "../features/field/fieldSlice";

const Fields = () => {
  const { numOfFieldPages, page, isFieldLoading, search } = useSelector(
    (store) => store.fields
  );
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl">
      <Header category="Page" title="Fields" />
      <Search
        handleSearchChange={handleFieldChange}
        loading={isFieldLoading}
        search={search}
      />
      <TableFields />
      {numOfFieldPages > 1 && (
        <Paging
          numOfPages={numOfFieldPages}
          page={page}
          handleChangePage={changeFieldPage}
        />
      )}
    </div>
  );
};

export default Fields;
