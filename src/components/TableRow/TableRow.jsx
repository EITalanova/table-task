import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { ReactComponent as EditIcon } from "../../assets/svg/table/edit.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/table/save.svg";


import { Formik, Field, Form, useFormikContext } from "formik";

import { ReactComponent as BottomIcon } from "../../assets/svg/table/bottom.svg";

import style from "./TableRow.module.css";
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
          <span>{error}</span>
      )}
    </>
  );
};

export const TableRow = ({
  item,
  editMode,
  editedData,
  handleEditClick,
  handleInputChange,
  handleSaveLine,
}) => (
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
);