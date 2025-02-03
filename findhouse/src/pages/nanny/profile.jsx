import React, { useState, useEffect } from 'react';
import ServiceSchedule from '../../components/base/ServiceSchedule';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nannyInfo, setNannyInfo] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNannyInfo();
  }, []);

  const fetchNannyInfo = async () => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(`/api/nanny/getNannyInfo/${id}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNannyInfo(data.nannies);
      setTotalItem(data.totalCount); // Set total items for pagination
    } catch (error) {
      console.error('Error fetching nanny info:', error);
    } finally {
      setIsLoading(false); // Set loading state to false when done fetching
    }
  };

  // 處理點擊圓點來跳轉到對應圖片
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBookingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <span className='imgFont'>托育環境</span>
          <div className="carousel">
            <img
              src={images[currentImageIndex]}
              alt={`圖片 ${currentImageIndex + 1}`}
              className="carouselImage"
            />
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

        <ServiceSchedule></ServiceSchedule>

            {/* Icon Navigation */}
        <div style={{backgroundColor:'#F3CCD4'}}>
            <div style={{backgroundColor:'#F3CCD4'}}>
              <div className="iconNav">
                <button>
                  <div className='iconStyle'>🏠</div>
                  <span className='fontSpan'>123</span>
                </button>
                <button>
                  <div className='iconStyle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M23.861 8H13V0H15C15.083 0 22.746 0.0999999 23.861 8ZM5.5 10L4 8C3.53293 7.38045 2.92873 6.87747 2.23476 6.53049C1.54078 6.1835 0.775884 6.00193 0 6L0 8C0.46553 8.00116 0.924469 8.1101 1.34085 8.31829C1.75724 8.52648 2.11976 8.82827 2.4 9.2L4 11.333V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H11.865L9.257 19.129C7.935 18.511 5.837 20.046 6.004 21.64C6.02797 22.0042 6.13163 22.3586 6.30766 22.6783C6.48369 22.998 6.7278 23.2752 7.02272 23.4901C7.31764 23.7051 7.65618 23.8527 8.01442 23.9224C8.37265 23.9922 8.74183 23.9824 9.09586 23.8937C9.44989 23.8051 9.78013 23.6398 10.0632 23.4095C10.3463 23.1792 10.5754 22.8895 10.7342 22.5609C10.8931 22.2323 10.9778 21.8728 10.9824 21.5079C10.987 21.143 10.9115 20.7815 10.761 20.449L14 16.562L17.239 20.449C17.0904 20.7814 17.0164 21.1423 17.0223 21.5063C17.0282 21.8704 17.1138 22.2287 17.2731 22.5561C17.4323 22.8835 17.6614 23.1721 17.9442 23.4014C18.2269 23.6308 18.5565 23.7954 18.9097 23.8837C19.263 23.972 19.6312 23.9818 19.9887 23.9124C20.3461 23.8431 20.684 23.6963 20.9785 23.4823C21.2731 23.2683 21.5172 22.9924 21.6937 22.6739C21.8702 22.3555 21.9747 22.0022 22 21.639C22.167 20.047 20.069 18.51 18.747 19.129L16.135 16H21C21.7956 16 22.5587 15.6839 23.1213 15.1213C23.6839 14.5587 24 13.7956 24 13V10H5.5Z" fill="#E3838E"/>
                    </svg>
                  </div>
                  <span className='fontSpan'>123</span>
                </button>
                <button>
                  <div className='iconStyle'>🏠</div>
                  <span className='fontSpan'>123</span>
                </button>
                <button>
                  <div className='iconStyle'>🏠</div>
                  <span className='fontSpan'>123</span>
                </button>
                <button>
                  <div className='iconStyle'>🏠</div>
                  <span className='fontSpan'>123</span>
                </button>
                <button>
                  <div className='iconStyle'>🏠</div>
                  <span className='fontSpan'>123</span>
                </button>
                </div>
          </div>
          <div style={{backgroundColor:'#F8ECEC'}}>
              <div className="introSection">
                <div className="notesSection">
                  <span className='imgFont'>保母自介</span>
                </div>
              </div>
          </div>
          <div className="criticismSection">
            <span className='criticalFont'>保母評語</span>
            
          </div>
        </div>

        <div className='buttonLayout'>
          <button className="submitButton" onClick={handleBookingClick}>+ 馬上預約</button>
        </div>

      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={handleCloseModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_304_31413)">
                  <path d="M14.7782 5.22943C14.4824 4.93364 14.0045 4.93364 13.7088 5.22943L10 8.9306L6.29124 5.22184C5.99545 4.92605 5.51763 4.92605 5.22184 5.22184C4.92605 5.51763 4.92605 5.99545 5.22184 6.29124L8.9306 10L5.22184 13.7088C4.92605 14.0045 4.92605 14.4824 5.22184 14.7782C5.51763 15.0739 5.99545 15.0739 6.29124 14.7782L10 11.0694L13.7088 14.7782C14.0045 15.0739 14.4824 15.0739 14.7782 14.7782C15.0739 14.4824 15.0739 14.0045 14.7782 13.7088L11.0694 10L14.7782 6.29124C15.0664 6.00303 15.0664 5.51763 14.7782 5.22943Z" fill="#252525"/>
                </g>
                <defs>
                  <clipPath id="clip0_304_31413">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <span className="modalTitle">確認向此保母發送托育服務需求</span>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'16px'}}>
              <button className="cancelBtn" onClick={handleCloseModal}>取消</button>
              <button className="confirmBtn">確認</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
          .criticalFont {
            color: #fff;
            font-family: "LINE Seed JP_TTF";
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
          .criticismSection {
            display: flex;
            padding: 10px 40px;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            align-self: stretch;
            background-color:#F3CCD4;
            border-radius: 50px 0px 0 0px;
          }
          .introSection {
            display: flex;
            height: 454px;
            padding: 37px 40px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            align-self: stretch;
            background-color:#F3CCD4;
            border-radius: 50px 0px 0 0px;
          }
        .container {
          background-color: #fceff1;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url('/background.png'); // Added background image
          background-repeat: no-repeat; // 防止重疊
          background-size: cover; // 使背景圖像覆蓋整個容器
          border: none;
          width:100%;
        }

        .imageSection {
          display: flex;
          padding: 10px 40px;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 6px;
          align-self: stretch;
          width: 100%;
          align-items:start
        }

        .imgFont {
          color: var(---Primary-Primary, #E3838E);
          font-family: "LINE Seed JP_TTF";
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        .carousel {
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          height:170px
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
            gap:30px;
            width:100%;
            justify-content:center;
        }

        .profileSection {
          text-align: center;
          gap: 20px;
          display: flex; // Fixed typo from 'flex' to flex
          flex-direction: column;
          justify-content: center;
          align-items: center; // Fixed typo from align-item to align-items
          background-size: cover; // Optional: to cover the entire section;
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
          margin-top:50px
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
            height: 77px;
            padding: 4px 66px 4px 66px;
            gap: 21px;
            border-radius: 8px;
            opacity: 0px;
            display:flex;
            background: linear-gradient(80.64deg, #FBDBD6 10.58%, #D9DFF0 75.92%);
            justify-content:center;
        }
        
        .mid-border {
            border: 2px solid #FCF7F7;
            width: 1px;
        }

        .tab {
            height: 65px;
            padding: 7px 0px 7px 0px;
            gap: 4px;
            opacity: 0px;
            display:flex;
            flex-direction:column;
            border-radius:8px;
            background:transparent;
            border:none;
            align-item:center
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
          height: 108px;
          padding: 18px 26px 0px 26px;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          align-self: stretch;
          width:100%;
          justify-content: space-around;
          background-color: #F8ECEC;
          border-radius: 50px 0px 50px 0px; 
        }

        .iconNav button {
          display: flex;
          width: 48px;
          height: 76px;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background-color:transparent;
          border:none
        }

        .iconStyle{
          display: flex;
          height: 37px;
          padding: 7px 12px 6px 12px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          align-self: stretch;
          border-radius: 16px;
          background: #FFF;
          flex-direction:column;
        }

        .fontSpan {
          color: var(---Primary-Primary, #E3838E);
          text-align: center;
          /* Line/medium/8pt */
          font-family: "LINE Seed JP_TTF";
          font-size: 8px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .notesSection {
          display: flex;
          width: 310px;
          height: 402px;
          padding: 23px 22px 356px 23px;
          flex-direction: column;
          align-items: flex-start;
          border-radius: 38px;
          border: 10px solid var(---Button-01, #FBDBD6);
          background: var(---SurfaceContainer-Lowest, #FFF);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          
        }

        .notesSection textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
          font-size: 14px;
        }

        .buttonLayout {
          position: fixed; /* Make the button layout fixed */
          bottom: 20px; /* Distance from the bottom */
          left: 50%; /* Center horizontally */
          transform: translateX(-50%); /* Adjust for centering */
          width: 100%; /* Adjust width as needed */
          max-width:390px;
          z-index: 1000; /* Ensure it appears above other content */
          padding: 20px 48px;
        }

        .submitButton {
          display: flex;
          padding: 8px 12px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          align-self: stretch;
          border-radius: 6px;
          background: var(---Primary-Primary, #E3838E);
          box-shadow: -1px 6px 12px -6px rgba(186, 186, 186, 0.25), 0px 8px 24px -4px rgba(186, 186, 186, 0.25);
          border:none;
          width:100%;
          color:#fff
        }

        .submitButton:hover {
          background-color: #c04f6b;
        }

        @media (max-width: 600px) {
          .container {
          }

          .tab {
            font-size: 12px;
          }

          .submitButton {
            font-size: 14px;
          }
        }

        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1100;
        }

        .modalContent {
          gap:8px;
          display: flex;
          width: 292px;
          padding-bottom: 20px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          background: var(---SurfaceContainer-Lowest, #FFF);
          box-shadow: -1px 6px 12px -6px rgba(186, 186, 186, 0.25), 0px 8px 24px -4px rgba(186, 186, 186, 0.25);
          position: relative;
        }

        .closeButton {
          display: flex;
          padding: 6px 5px 0px 267px;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
          border:none;
          background:transparent;
          font-size:24px;
          cursor:pointer;
          color:#666
        }

        .closeButton:hover {
          color: #333;
        }
        .modalTitle {
          color: var(---Outline-OnSurfaceVariant, #402626);
          text-align: center;
          /* Line/bold/16pt */
          font-family: "LINE Seed JP_TTF";
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .cancelBtn {
          display: flex;
          width: 100px;
          padding: 8px 12px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border-radius: 6px;
          background: var(---Surface-LT, #F2F2F2);
          border:none;
          color:#CCC
        }
          .confirmBtn {
            display: flex;
            width: 100px;
            padding: 8px 12px;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            border-radius: 6px;
            background: var(---Primary-Primary, #E3838E);
            border:none;
            color:#fff
          }
      `}</style>
    </div>
  );
}

