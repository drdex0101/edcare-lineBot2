import React, { useState } from 'react';
export default function ProfilePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 圖片數組，可以替換成你想要展示的圖片路徑
  const images = [
    '/static/image1.jpg',
    '/static/image2.jpg',
    '/static/image3.jpg',
  ];

  // 處理下一張圖片
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 處理上一張圖片
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 處理點擊圓點來跳轉到對應圖片
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container">

      {/* Profile Section */}
      <div className="profileSection">
        <img className="profilePic" src="/assets/images/resource/error.png" alt="Profile" /> {/* 頭貼圓形 */}
        <h2 className="profileName">王美麗</h2>
        <div className="rating">
          ⭐⭐⭐⭐⭐
        </div>
        <div className='profile-section'>
            <div className='part'>
                <span className='part-title'>經驗</span>
                <span className='part-subTitle'>3年6月</span>
            </div>
            <div className='part'>
                <span className='part-title'>年紀</span>
                <span className='part-subTitle'>28歲</span>
            </div>
            <div className='part'>
                <span className='part-title'>托育</span>
                <span className='part-subTitle'>2位</span>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab active">
            <span className='tab-tile'>
                托育方式
            </span>
            <span className='tab-subTitle'>
                長期托育
            </span>
        </button>
        <div className='mid-border'></div>
        <button className="tab">
            <span className='tab-tile'>
                托育情境
            </span>
            <span className='tab-subTitle'>
                在宅托育
            </span>
        </button>
      </div>

      {/* 圖片輪播區域 */}
      <div className="imageSection">
        <h3>托育環境</h3>
        <div className="carousel">
          <button className="prevButton" onClick={handlePrevImage}>
            ←
          </button>
          <img
            src={images[currentImageIndex]}
            alt={`圖片 ${currentImageIndex + 1}`}
            className="carouselImage"
          />
          <button className="nextButton" onClick={handleNextImage}>
            →
          </button>
        </div>

        {/* 圓點指示器 */}
        <div className="dotsContainer">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>


      {/* Icon Navigation */}
      <div className="iconNav">
        <button>🏠</button>
        <button>📷</button>
        <button>📊</button>
        <button>📱</button>
        <button>📅</button>
      </div>

      {/* Notes Section */}
      <div className="notesSection">
        <textarea placeholder="輸入備註"></textarea>
      </div>

      {/* Submit Button */}
      <button className="submitButton">+ 上傳</button>

      <style jsx>{`
        .container {
          background-color: #fceff1;
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .imageSection {
          width: 100%;
          margin-bottom: 20px;
          text-align: center;
        }

        .carousel {
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        .carouselImage {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .prevButton,
        .nextButton {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 18px;
          padding: 10px;
          cursor: pointer;
        }

        .prevButton {
          left: 0;
        }

        .nextButton {
          right: 0;
        }

        .prevButton:hover,
        .nextButton:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        /* 圓點指示器樣式 */
        .dotsContainer {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .dot {
          height: 10px;
          width: 10px;
          background-color: #ddd;
          border-radius: 50%;
          display: inline-block;
          margin: 0 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dot.active {
          background-color: #d65b78;
        }

        .serviceTimeContainer {
          width: 100%;
          text-align: center;
          margin-top: 20px;
        }

        h3 {
          color: #d65b78;
          margin-bottom: 10px;
        }

        .timeChart {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* 星期標籤 */
        .weekDays {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          margin-bottom: 10px;
        }

        .day {
          width: 100%;
          text-align: center;
          color: #666;
          padding: 5px;
          background-color: #f0f0f0;
          border-radius: 50%;
          margin: 0 5px;
        }

        .day.active {
          background-color: #ffd1e1;
          color: #d65b78;
        }

        /* 時間區間條 */
        .timeBars {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          height: 120px;
        }

        .bar {
          width: 12%;
          background-color: #f0f0f0;
          border-radius: 10px;
        }

        .bar.active {
          background-color: #f9a8b6;
        }

        /* 時間標籤 */
        .timeLabels {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          max-width: 400px;
          margin-top: 10px;
        }

        .timeLabels span {
          display: block;
          width: 100%;
          font-size: 12px;
          color: #666;
          margin-bottom: 20px;
        }


        .header {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .title {
          font-size: 18px;
          color: #d65b78;
        }

        .profile-section {
            display: flex ;

        }

        .profileSection {
          text-align: center;
          margin-bottom: 20px;
          gap:20px
        }

        .part {
            display:flex;
            flex-direction:column;
            justify-content:center;
            margin:8px;
            gap:12px
        }

        .part-title {
            font-size: 12px;
            font-weight: 400;
            line-height: 19.32px;
            text-align: center;
        }

        .part-subTitle {
            font-size: 14px;
            font-weight: 700;
            line-height: 22.54px;
            text-align: center;
        }

        .profilePic {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 10px;
        }

        .profileName {
          font-size: 20px;
          color: #d65b78;
        }

        .rating {
          font-size: 18px;
          color: #ffd700;
        }

        .tabs {
            width: 260px;
            height: 77px;
            padding: 6px 14px 6px 14px;
            gap: 21px;
            border-radius: 8px 0px 0px 0px;
            opacity: 0px;
            display:flex;
            background: linear-gradient(80.64deg, #FBDBD6 10.58%, #D9DFF0 75.92%);
        }
        
        .mid-border {
            border: 2px solid #FCF7F7;
            width: 1px;
        }

        .tab {
            width: 105px;
            height: 65px;
            padding: 7px 0px 7px 0px;
            gap: 4px;
            opacity: 0px;
            display:flex;
            flex-direction:column;
            border-radius:8px;
            background:transparent;
            border:none
        }

        .tab-tile {
            font-size: 11px;
            font-weight: 400;
            line-height: 17.71px;
            text-align: center;
            color: #E3838E;
        }

        .tab-subTitle {
            font-family: LINE Seed JP_TTF;
            font-size: 18px;
            font-weight: 700;
            line-height: 28.98px;
            text-align: center;
        }


        .imageSection, .chartSection {
          width: 100%;
          margin-bottom: 20px;
        }

        .imagePlaceholder, .chartPlaceholder {
          background-color: #e1e1e1;
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
        }

        .iconNav {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin-bottom: 20px;
        }

        .iconNav button {
          background-color: transparent;
          border: none;
          font-size: 24px;
          color: #d65b78;
          cursor: pointer;
        }

        .notesSection {
          width: 100%;
          margin-bottom: 20px;
        }

        .notesSection textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
          font-size: 14px;
        }

        .submitButton {
          width: 100%;
          padding: 15px;
          background-color: #d65b78;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .submitButton:hover {
          background-color: #c04f6b;
        }

        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }

          .tab {
            font-size: 12px;
          }

          .submitButton {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
