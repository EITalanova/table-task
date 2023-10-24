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

import { ReactComponent as EditIcon } from "../../assets/svg/table/edit.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/table/save.svg";
import { ReactComponent as TopIcon } from "../../assets/svg/table/top.svg";
import { ReactComponent as BottomIcon } from "../../assets/svg/table/bottom.svg";

import style from "./TableLayout.module.css";

const InputField = ({ name, value, onChange }) => {
  const { errors, touched } = useFormikContext();
  const error = touched[name] && errors[name];

  return (
    <>
      <Field
        className={style.logFormField}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {touched[name] && error && (
        <div className={style.messageError}>
          {/* <ErrorIcon /> */}
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

export const TableLayout = () => {
  const [sortBy, setSortBy] = useState(""); // Имя столбца для сортировки
  const [sortOrder, setSortOrder] = useState("asc"); // Порядок сортировки (asc или desc)

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      // Изменение порядка сортировки при повторном нажатии на тот же столбец
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Сортировка нового столбца в порядке возрастания
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  // Функция для сортировки данных
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
  }, [dispatch]);

  const handleEditClick = (id) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [id]: true,
    }));
  };

  const handleSaveClick = (id) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [id]: false,
    }));
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
    <div className={style.tableBox}>
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
        <table className={style.table}>
          <thead>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={sortBy === column.key ? style.sorted : ""}
              >
                {column.title}
                {sortBy === column.key && sortOrder === "asc" ? (
                  <TopIcon />
                ) : (
                  <BottomIcon />
                )}
              </th>
            ))}
          </thead>
          <tbody>
            {table &&
              table.results &&
              sortTableData().map((item) => (
                <tr key={item.id}>
                  {Object.keys(item).map((name) => (
                    <td key={name}>
                      {editMode[item.id] ? (
                        <Form>
                          <InputField
                            name={name}
                            value={editedData[name]?.[item.id] || item[name]}
                            onChange={(e) =>
                              handleInputChange(item.id, name, e.target.value)
                            }
                          />
                        </Form>
                      ) : (
                        editedData[name]?.[item.id] || item[name]
                      )}
                    </td>
                  ))}

                  <td>
                    {editMode[item.id] ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <button onClick={() => handleSaveLine(item.id)}>
                          <SaveIcon />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <button onClick={() => handleEditClick(item.id)}>
                          <EditIcon />
                        </button>
                      </motion.div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Formik>
      <Pagination count={count} />
    </div>
  );
};
