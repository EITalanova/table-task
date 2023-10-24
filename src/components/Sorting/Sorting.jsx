import React, { useEffect, useState } from "react";

import { Formik, Field, Form, useFormikContext } from "formik";

import { ReactComponent as TopIcon } from "../../assets/svg/table/top.svg";
import { ReactComponent as BottomIcon } from "../../assets/svg/table/bottom.svg";

import style from "./Sorting.module.css";


export const Sorting = ({ columns, sortBy, sortOrder, handleSort }) => (
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
);