import { selectCurrentPage, selectLimit } from "../../redux/table/tableSelector";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Pagination = ({ count }) => {
  const [page, setPage] = useState(1);
  const limit = useSelector(selectLimit);

  const totalPages = Math.ceil(count / limit);
  console.log(totalPages);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleChangePage = (newPage) => {
    if (newPage !== page) { // Перевірка, чи нова сторінка відрізняється від поточної
      setPage(newPage);
    }
  };

  return (
    <div>
      <button>Prev</button>
      {pages.map((newPage) => (
  <button key={newPage} onClick={() => handleChangePage(newPage)}>
    {newPage}
  </button>
))}

      <button>Next</button>
    </div>
  );
};
