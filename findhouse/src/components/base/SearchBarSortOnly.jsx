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
            <div 
              className={`filter-sort-font ${selectedSort === 'rating' ? '' : 'filter-sort-font-none'}`} 
              onClick={() => toggleSort('rating')}
              onChange={() => toggleSort('rating')}
            >
              保母評價( 5 ⭢ 0 )
            </div>
          </div>
          <button onClick={() => onChange(selectedSort)}>搜尋</button>
        </div>
      )}
    </div>
  );
}
