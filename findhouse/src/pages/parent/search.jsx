import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function CareListPage() {
  const router = useRouter();

   // Handle form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next step
    router.push('/parent/baby/step1');
  };


  return (
    <div className="container">
      {/* 標題和建立按鈕 */}
      <div className="header">
        <button className="addButton" onClick={handleSubmit}>托育資料填寫</button>
      </div>

      {/* 搜尋欄 */}
      <div className="searchBar">
        <input type="text" placeholder="搜尋" className="searchInput" />
        <button className="filterButton">
          <img src="/static/filter-icon.png" alt="filter" />
        </button>
      </div>

      {/* 列表篩選欄 */}
      <div className="filterSection">
        <span>地區: 4</span>
        <button className="sortButton">上架時間 (新→舊)</button>
      </div>

      {/* 托育資料列表 */}
      <div className="careList">
        {careData.map((item, index) => (
          <div key={index} className="careItem">
            <img src={item.imgSrc} alt={item.name} className="profilePic" />
            <div className="careInfo">
              <span className="name">{item.name}</span>
              <span className="experience">{item.experience}</span>
            </div>
            <div className="rating">
              <span>{item.rating}</span>
              <span className="star">⭐</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分頁 */}
      <div className="pagination">
        <button className="pageButton">1</button>
        <button className="pageButton">2</button>
        <button className="pageButton">3</button>
        <button className="pageButton">4</button>
        <button className="pageButton">5</button>
      </div>

      <style jsx>{`
        .container {
          background-color: #fceff1;
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          background-color:#FFF
        }

        h1 {
          font-size: 18px;
          color: #d65b78;
        }

        .addButton {
          padding: 10px 15px;
          background-color: transparent;
          color: transparnet;
          border: #F3CCD4;
          border-radius: 5px;
          cursor: pointer;
        }

        .searchBar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
        }

        .searchInput {
          flex: 1;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
          margin-right: 10px;
        }

        .filterButton {
          background-color: transparent;
          border: none;
        }

        .filterSection {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          margin-bottom: 10px;
        }

        .sortButton {
          padding: 5px 10px;
          background-color: #ffd1e1;
          color: #d65b78;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .careList {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
        }

        .careItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #fff;
          border-radius: 10px;
          margin-bottom: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .profilePic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .careInfo {
          flex: 1;
        }

        .name {
          font-weight: bold;
          color: #333;
        }

        .experience {
          color: #666;
          font-size: 12px;
        }

        .rating {
          display: flex;
          align-items: center;
          color: #ffd700;
        }

        .star {
          margin-left: 5px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 400px;
        }

        .pageButton {
          padding: 5px 10px;
          background-color: #fff;
          color: #d65b78;
          border: 1px solid #d65b78;
          border-radius: 5px;
          margin: 0 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
