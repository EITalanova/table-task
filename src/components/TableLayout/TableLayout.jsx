import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../redux/table/tableSelector";
import { fetchTableData } from "../../redux/table/tableThunks";
import { updateLine } from "../../redux/table/tableThunks";
import { motion } from "framer-motion";

import { ReactComponent as EditIcon } from "../../assets/svg/table/edit.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/table/save.svg";

import style from "./TableLayout.module.css";

export const TableLayout = () => {
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});

  const table = useSelector(selectTableData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTableData(30));
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
    // Получите данные из editedData для обновления
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

  return (
    <>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday Date</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {table &&
            table.results &&
            table.results.map((item) => (
              <tr key={item.id}>
                {Object.keys(item).map((name) => (
                  <td key={name}>
                    {editMode[item.id] ? (
                      <input
                        type="text"
                        value={editedData[name]?.[item.id] || item[name]}
                        onChange={(e) =>
                          handleInputChange(item.id, name, e.target.value)
                        }
                      />
                    ) : (
                      editedData[name]?.[item.id] || item[name]
                    )}
                  </td>
                ))}
                <td>
                  {editMode[item.id] ? (
                    <motion.div
                      className="box"
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
                      className="box"
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
    </>
  );
};
