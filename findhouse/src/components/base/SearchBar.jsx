import React, { useState, useEffect, useRef } from "react";
import "./css/SearchBar.css";

export default function FilterButton() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const filterPopupRef = useRef(null); // 篩選框引用
  const filterButtonRef = useRef(null); // 按鈕引用

  const toggleFilterPopup = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOutsideClick = (event) => {
    // 確保點擊的不是篩選框或按鈕
    if (
      filterPopupRef.current &&
      filterButtonRef.current &&
      !filterPopupRef.current.contains(event.target) &&
      !filterButtonRef.current.contains(event.target)
    ) {
      setIsFilterOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="filter-container">
      <button
        ref={filterButtonRef} // 設置按鈕引用
        className="filter-button"
        onClick={toggleFilterPopup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 13H18V11H6V13ZM3 6V8H21V6H3ZM10 18H14V16H10V18Z"
            fill="#E3838E"
          />
        </svg>
      </button>
      {isFilterOpen && (
        <div
          ref={filterPopupRef} // 設置篩選框引用
          className="filter-popup"
        >
          <div className="filter-header">
            <span>地區</span>
            <span className="filter-count">4</span>
          </div>
          <div className="filter-section">
            <div className="filter-group">
              <label>
                <input type="checkbox" />
                斗六
              </label>
              <label>
                <input type="checkbox" />
                斗南
              </label>
            </div>
            <div className="filter-group">
              <label>
                <input type="checkbox" />
                虎尾
              </label>
              <label>
                <input type="checkbox" />
                林內
              </label>
            </div>
          </div>
          <div className="filter-footer">
            <button className="filter-apply">套用</button>
            <button
              className="filter-cancel"
              onClick={() => setIsFilterOpen(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
