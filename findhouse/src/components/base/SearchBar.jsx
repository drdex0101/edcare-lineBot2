import React, { useState, useEffect, useRef } from "react";
import "./css/SearchBar.css";

export default function FilterButton({ onChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 控制篩選框顯示
  const [selectedLocations, setSelectedLocations] = useState([]); // 已選地區
  const [selectedRegion, setSelectedRegion] = useState(null); // 當前選擇的區域
  const [selectedSort, setSelectedSort] = useState(null); // 新增狀態以追蹤選擇的排序
  const filterPopupRef = useRef(null);
  const filterButtonRef = useRef(null);

  // 定義區域和對應的地區
  const regions = {
    "斗六生活圈": ["斗六", "斗南", "林內", "古坑", "莿桐"],
    "虎尾生活圈": ["虎尾", "西螺", "二崙", "土庫", "大埤"],
    "北港生活圈": ["北港", "元長", "四湖", "水林", "口湖"],
    "麥寮生活圈": ["麥寮", "崙背", "褒忠", "東勢", "台西"],
  };

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

  // 選擇區域，更新選擇的地區
  const handleRegionClick = (region) => {
    setSelectedRegion(region); // 設定當前選擇的區域
    setSelectedLocations([]); // 清空已選地區
  };

  // 切換地區選擇
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location) // 如果已選中，則移除
        : [...prev, location] // 如果未選中，則添加
    );
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
        <div ref={filterPopupRef} className="filter-popup">
          <div className="filter-header">
            <span>地區</span>
          </div>
          <div className="filter-section">
            {/* 區域選擇 */}
            <div className="filter-group">
              {Object.keys(regions).map((region, index) => (
                <div key={index} className="filter-region">
                  <label
                    className={`filter-right ${
                      selectedRegion === region ? "filter-right-selected" : "filter-right"
                    }`}
                    onClick={() => handleRegionClick(region)}
                  >
                    {region}
                  </label>
                </div>
              ))}
            </div>
            {/* 顯示對應地區 */}
            {selectedRegion && (
              <div className="filter-group">
                {regions[selectedRegion].map((location, index) => (
                  <label
                    className="filter-checkbox"
                    key={index}
                  >
                    {location}
                    <input 
                      type="checkbox" 
                      checked={selectedLocations.includes(location)}
                      onChange={() => toggleLocation(location)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
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
          <button onClick={() => onChange(selectedRegion, selectedLocations, selectedSort, selectedLocations.length)}>搜尋</button>
        </div>
      )}
    </div>
  );
}
