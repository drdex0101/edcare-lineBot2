import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageClick = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`page-button ${activePage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(Math.max(1, activePage - 1))}
        disabled={activePage === 1}
        className="page-button"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(Math.min(totalPages, activePage + 1))}
        disabled={activePage === totalPages}
        className="page-button"
      >
        &gt;
      </button>
      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent; /* Pink background */
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

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Perform any actions for the new page, e.g., fetching data
  };

  return (
    <div>
      <Pagination
        totalPages={5}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
