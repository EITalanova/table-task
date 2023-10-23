import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { selectCurrentPage, selectTotalPages } from '../../redux/table/tableSelector';

import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../redux/table/tableSelector";

import { fetchTableData } from "../../redux/table/tableThunks";

import { Pagination } from "../Pagination/Pagination";

import style from "./TableLayout.module.css";


export const TableLayout = () => {
const table = useSelector(selectTableData);
  const dispatch = useDispatch();

  const totalPages = useSelector(selectTotalPages); // Додаємо селектор для totalPages
  const currentPage = useSelector(selectCurrentPage); 

  


dispatch(fetchTableData({ page: currentPage, limit: 10 }));
  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);


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
          {table.results.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.birthday_date}</td>
              <td>{item.phone_number}</td>
              <td>{item.address}</td>
              <td>
                <button>Edit</button>
                <button>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalPages={totalPages} currentPage={currentPage} /> {/* Передаємо totalPages та currentPage у компонент Pagination */}

    </>
  );
};
