import React from "react";
import "./Pagination.module.css";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  const setPage = async (page) => {
    console.log("setCurrent", currentPage);
    return await setCurrentPage(page);
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {generatedPages.map((page) => (
          <li key={page} className="page-item">
            <a
            style={{cursor:"pointer"}}
              className={
                currentPage === page ? "page-link active" : "page-link"
              }
              onClick={() => setPage(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
