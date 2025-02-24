import React, { useState, useEffect, useRef } from "react";
import "./css/SearchBar.css";

export default function SearchBarSortOnly({ onChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 控制篩選框顯示
  const [selectedSort, setSelectedSort] = useState(null); // 新增狀態以追蹤選擇的排序
  const filterPopupRef = useRef(null);
  const filterButtonRef = useRef(null);

  // 切換篩選框顯示
  const toggleFilterPopup = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // 處理點擊篩選框外部時關閉
  const handleOutsideClick = (event) => {
    if (
      filterPopupRef.current &&
      filterButtonRef.current &&
      !filterPopupRef.current.contains(event.target) &&
      !filterButtonRef.current.contains(event.target)
    ) {
      setIsFilterOpen(false);
    }
  };

  // 切換排序選擇
  const toggleSort = (sortType) => {
    setSelectedSort(sortType); // 設定當前選擇的排序
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="filter-container">
      <button
        ref={filterButtonRef}
        className="filter-button"
        onClick={toggleFilterPopup}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 13H18V11H6V13ZM3 6V8H21V6H3ZM10 18H14V16H10V18Z" fill="#252525"/>
        </svg>
      </button>
      {isFilterOpen && (
        <div ref={filterPopupRef} className="filter-popup">
          <div className="filter-header">
                <span>排序</span>
          </div>
          <div className="filter-sort-layout">
            <div 
              className={`filter-sort-font ${selectedSort === 'time' ? '' : 'filter-sort-font-none'}`} 
              onClick={() => toggleSort('time')}
              onChange={() => toggleSort('time')}
            >
              上架時間（新 ⭢ 舊）
            </div>
          </div>
          <div className="filter-footer">
            <button onClick={() => onChange(selectedSort)} className="filter-button-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3V3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
              </svg>
              搜尋
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
