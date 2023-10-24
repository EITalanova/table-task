import {
  selectCurrentPage,
  selectLimit,
} from "../../redux/table/tableSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setOffset } from "../../redux/table/tableSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { ReactComponent as LeftIcon } from "../../assets/svg/pagination/arrowLeft.svg";
import { ReactComponent as RightIcon } from "../../assets/svg/pagination/arrowRight.svg";
import style from "./Pagination.module.css";

export const Pagination = ({ count }) => {
  const [page, setPage] = useState(1);
  const limit = useSelector(selectLimit);
  const offset = limit * page - 10;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOffset(offset));
  }, [page]);

  const totalPages = Math.ceil(count / limit);
  const pages = [];


  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleChangePage = (newPage) => {
    if (newPage === "left") {
      setPage(page - 1);
    } else if (newPage === "right") {
      setPage(page + 1);
    } else {
      setPage(newPage);
    }
    dispatch(setOffset(offset));
  };

  return (
    <div className={style.paginationBox}>
      <button
        id="left"
        onClick={() => handleChangePage("left")}
        disabled={page === 1}
        className={page === 1 ? style.disabled : ""}
      >
        <LeftIcon />
      </button>
      {pages.map((newPage) => (
        <button
          className={newPage === page ? style.current : ""}
          key={newPage}
          onClick={() => handleChangePage(newPage)}
        >
          {newPage}
        </button>
      ))}

      <button
        id="right"
        onClick={() => handleChangePage("right")}
        disabled={totalPages <= page}
        className={totalPages <= page ? style.disabled : ""}
      >
        <RightIcon />
      </button>
    </div>
  );
};
