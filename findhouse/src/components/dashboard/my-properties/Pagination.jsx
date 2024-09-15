import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)} tabIndex="-1" aria-disabled="currentPage === 1">
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      {pageNumbers.map(number => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <a onClick={() => paginate(number)} href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
