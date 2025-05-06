import React, { useState, useEffect, useRef } from "react";
import "./css/SearchBar.css";

export default function FilterButton({
  onChange,
  locationCount,
  selectedSort: propSelectedSort,
  selectedRegion: propSelectedRegion,
  selectedLocations: propSelectedLocations,
  from,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 控制篩選框顯示
  const [selectedLocations, setSelectedLocations] = useState(
    propSelectedLocations || []
  ); // 已選地區
  const [selectedRegion, setSelectedRegion] = useState(
    propSelectedRegion || ""
  ); // 當前選擇的區域
  const [selectedSort, setSelectedSort] = useState(propSelectedSort || "time"); // 預設為 "time"
  const filterPopupRef = useRef(null);
  const filterButtonRef = useRef(null);

  // 定義區域和對應的地區
  const regions = {
    斗六生活圈: ["斗六", "斗南", "林內", "古坑", "莿桐"],
    虎尾生活圈: ["虎尾", "西螺", "二崙", "土庫", "大埤"],
    北港生活圈: ["北港", "元長", "四湖", "水林", "口湖"],
    麥寮生活圈: ["麥寮", "崙背", "褒忠", "東勢", "台西"],
  };

  const handleChange = () => {
    onChange(selectedRegion, selectedLocations, selectedSort);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setSelectedLocations([]);
    setSelectedRegion("");
    setSelectedSort("time");
    handleChange();
  };

  // 監聽 props 變更，確保 state 更新
  useEffect(() => {
    setSelectedLocations(propSelectedLocations || []);
    setSelectedRegion(propSelectedRegion || "");
    setSelectedSort(propSelectedSort || "time");
  }, [propSelectedLocations, propSelectedRegion, propSelectedSort]);

  // 切換篩選框顯示
  const toggleFilterPopup = () => {
    if (!isFilterOpen) {
      // 當開啟篩選框時，重置所有選擇
      setSelectedLocations([]);
      setSelectedRegion("");
      setSelectedSort("time");
    }
    setIsFilterOpen(!isFilterOpen);
  };

  // 選擇區域，更新選擇的地區
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  // 切換地區選擇
  const toggleLocation = (location) => {
    setSelectedLocations((prev) => {
      const updatedLocations = prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location];
      setSelectedLocations(updatedLocations);
      return updatedLocations;
    });
  };

  // 切換排序選擇
  const toggleSort = (sortType) => {
    setSelectedSort(sortType);
  };

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
                      selectedRegion === region
                        ? "filter-right-selected"
                        : "filter-right"
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
                  <label className="filter-checkbox" key={index}>
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
              className={`filter-sort-font ${selectedSort === "time" ? "" : "filter-sort-font-none"}`}
              onClick={() => toggleSort("time")}
            >
              上架時間（新 ⭢ 舊）
            </div>
            {from !== "nanny" && (
              <div
                className={`filter-sort-font ${selectedSort === "rating" ? "" : "filter-sort-font-none"}`}
                onClick={() => toggleSort("rating")}
              >
                保母評價( 5 ⭢ 0 )
              </div>
            )}
          </div>
          <div className="filter-footer">
            <button
              className="filter-button-search"
              onClick={() => {
                handleReset();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21.5 2v6h-6" />
                <path d="M2.5 22v-6h6" />
                <path d="M2 12a10 10 0 0 1 18.1 -4.2L21.5 2" />
                <path d="M22 12a10 10 0 0 1 -18.1 4.2L2.5 22" />
              </svg>
              重置
            </button>
            <button
              className="filter-button-search"
              onClick={() => {
                handleChange();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3V3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
                  fill="#fff"
                />
              </svg>
              搜尋
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
