import React, { useState } from "react";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`page-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="page-button"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="page-button"
      >
        &gt;
      </button>
      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          padding: 10px;
          border-radius: 5px;
        }
        .page-button {
          margin: 0 5px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 16px;
          color: #333;
        }
        .page-button.active {
          background-color: #fff;
          color: #d9534f;
          border-radius: 50%;
        }
        .page-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

const App = ({ totalItems, keyword,setPage, pageSize=5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  return (
    <div>
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
