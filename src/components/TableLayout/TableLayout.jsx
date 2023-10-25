import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../redux/table/tableSelector";
import { fetchTableData } from "../../redux/table/tableThunks";
import { updateLine } from "../../redux/table/tableThunks";
import { motion } from "framer-motion";
import { Pagination } from "../Pagination/Pagination";
import { setOffset } from "../../redux/table/tableSlice";
import { selectOffset } from "../../redux/table/tableSelector";
import { Formik, Field, Form, useFormikContext } from "formik";
import { TableSchema, LoginSchema } from "../../utils/yup";

import { Sorting } from "../Sorting/Sorting";
import { TableRow } from "../TableRow/TableRow";

import style from "./TableLayout.module.css";

export const TableLayout = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const sortTableData = () => {
    const sortedData = [...table.results];
    sortedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
    return sortedData;
  };

  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});

  const table = useSelector(selectTableData);
  const offset = useSelector(selectOffset);
  const dispatch = useDispatch();
  const { count } = table;

  useEffect(() => {
    dispatch(fetchTableData(offset));
  }, [offset]);

  const handleEditClick = (id) => {
    setEditMode((prevMode) => {
      return {
        ...prevMode,
        [id]: !prevMode[id],
      };
    });
  };

  const handleInputChange = (id, name, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [name]: { ...prevData[name], [id]: value },
    }));
  };

  const handleSaveLine = (id) => {
    const updatedData = {
      id: id,
      ...table.results.find((item) => item.id === id),
      ...Object.keys(editedData).reduce((acc, name) => {
        acc[name] =
          editedData[name][id] ||
          table.results.find((item) => item.id === id)[name];
        return acc;
      }, {}),
    };

    dispatch(updateLine(updatedData));

    setEditMode((prevMode) => ({
      ...prevMode,
      [id]: false,
    }));
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "birthday_date", title: "Birthday Date" },
    { key: "phone_number", title: "Phone Number" },
    { key: "address", title: "Address" },
  ];

  return (
    <Formik
        validationSchema={TableSchema}
        initialValues={{
          name: "",
          email: "",
          birthday_date: "",
          phone_number: "",
          address: "",
        }}
        onSubmit={() => console.log("first")}
      >
    <div className={style.tableBox}>
      
        <table className={style.table}>
          <Sorting
            columns={columns}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />

          <tbody>
            {table &&
              table.results &&
              sortTableData().map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  editMode={editMode}
                  editedData={editedData}
                  handleEditClick={handleEditClick}
                  handleInputChange={handleInputChange}
                  handleSaveLine={handleSaveLine}
                />
              ))}
          </tbody>
        </table>
      
      <Pagination count={count} />
      </div>
      </Formik>
  );
};
