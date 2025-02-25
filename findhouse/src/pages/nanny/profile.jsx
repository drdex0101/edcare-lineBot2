import React, { useState, useEffect } from "react";
import ServiceSchedule from "../../components/base/ServiceSchedule";
import { useParams } from "react-router-dom";
import RatingComponent from "../../components/nanny/rating";
import "./css/profile.css";
export default function ProfilePage() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nannyInfo, setNannyInfo] = useState("");
  const [images, setImages] = useState([
    "/assets/images/resource/error.png",
    "/assets/images/resource/error.png",
    "/assets/images/resource/error.png",
    "/assets/images/resource/error.png",
    "/assets/images/resource/error.png",
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleSvgClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    fetchNannyInfo();
  }, []);

  const fetchNannyInfo = async () => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(`/api/nanny/getNannyInfo/${id}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNannyInfo(data.nannies);
      setTotalItem(data.totalCount); // Set total items for pagination
    } catch (error) {
      console.error("Error fetching nanny info:", error);
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
      <div className="nanny-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
        >
          <path
            d="M10 4.17381C8 -0.52063 1 -0.0206299 1 5.9794C1 11.9794 10 16.9796 10 16.9796C10 16.9796 19 11.9794 19 5.9794C19 -0.0206299 12 -0.52063 10 4.17381Z"
            stroke="#E3838E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          className={`svg-icon ${isActive ? "active" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          onClick={handleSvgClick}
          style={{ cursor: "pointer", fill: isActive ? "#E3838E" : "none" }}
        >
          <path
            d="M10 4.17381C8 -0.52063 1 -0.0206299 1 5.9794C1 11.9794 10 16.9796 10 16.9796C10 16.9796 19 11.9794 19 5.9794C19 -0.0206299 12 -0.52063 10 4.17381Z"
            stroke="#E3838E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {/* Profile Section */}
      <div className="profileSection">
        <img
          className="profilePic"
          src="/assets/images/resource/error.png"
          alt="Profile"
        />{" "}
        {/* 頭貼圓形 */}
        <h2 className="profileName">王美麗</h2>
        <div className="rating-star">
          <RatingComponent score={3.7} />
        </div>
        <div className="profile-section">
          <div className="part">
            <span className="part-title">經驗</span>
            <span className="part-subTitle">3年6月</span>
          </div>
          <div className="part">
            <span className="part-title">年紀</span>
            <span className="part-subTitle">28歲</span>
          </div>
          <div className="part">
            <span className="part-title">托育</span>
            <span className="part-subTitle">2位</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="tabs">
          <div className="tab-content">
            <span className="tab-tile">托育方式</span>
            <span className="tab-subTitle">長期托育</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="62"
            viewBox="0 0 2 62"
            fill="none"
          >
            <path
              d="M1 61L1 1"
              stroke="#FCF7F7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <div className="tab-content">
            <span className="tab-tile">托育情境</span>
            <span className="tab-subTitle">在宅托育</span>
          </div>
        </div>
        {/* 圖片輪播區域 */}
        <div className="imageSection">
          <span className="imgFont">托育環境</span>
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
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: "#F8ECEC" }}>
          <ServiceSchedule></ServiceSchedule>
        </div>
        {/* Icon Navigation */}
        <div style={{ backgroundColor: "#fff", border: "none" }}>
          <div
            style={{
              backgroundColor: "#F3CCD4",
              borderRadius: "50px 0px 0px 0px",
            }}
          >
            <div className="iconNav">
              <button>
                <div className="iconStyle">🏠</div>
                <span className="fontSpan">123</span>
              </button>
              <button>
                <div className="iconStyle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M23.861 8H13V0H15C15.083 0 22.746 0.0999999 23.861 8ZM5.5 10L4 8C3.53293 7.38045 2.92873 6.87747 2.23476 6.53049C1.54078 6.1835 0.775884 6.00193 0 6L0 8C0.46553 8.00116 0.924469 8.1101 1.34085 8.31829C1.75724 8.52648 2.11976 8.82827 2.4 9.2L4 11.333V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H11.865L9.257 19.129C7.935 18.511 5.837 20.046 6.004 21.64C6.02797 22.0042 6.13163 22.3586 6.30766 22.6783C6.48369 22.998 6.7278 23.2752 7.02272 23.4901C7.31764 23.7051 7.65618 23.8527 8.01442 23.9224C8.37265 23.9922 8.74183 23.9824 9.09586 23.8937C9.44989 23.8051 9.78013 23.6398 10.0632 23.4095C10.3463 23.1792 10.5754 22.8895 10.7342 22.5609C10.8931 22.2323 10.9778 21.8728 10.9824 21.5079C10.987 21.143 10.9115 20.7815 10.761 20.449L14 16.562L17.239 20.449C17.0904 20.7814 17.0164 21.1423 17.0223 21.5063C17.0282 21.8704 17.1138 22.2287 17.2731 22.5561C17.4323 22.8835 17.6614 23.1721 17.9442 23.4014C18.2269 23.6308 18.5565 23.7954 18.9097 23.8837C19.263 23.972 19.6312 23.9818 19.9887 23.9124C20.3461 23.8431 20.684 23.6963 20.9785 23.4823C21.2731 23.2683 21.5172 22.9924 21.6937 22.6739C21.8702 22.3555 21.9747 22.0022 22 21.639C22.167 20.047 20.069 18.51 18.747 19.129L16.135 16H21C21.7956 16 22.5587 15.6839 23.1213 15.1213C23.6839 14.5587 24 13.7956 24 13V10H5.5Z"
                      fill="#E3838E"
                    />
                  </svg>
                </div>
                <span className="fontSpan">123</span>
              </button>
              <button>
                <div className="iconStyle">🏠</div>
                <span className="fontSpan">123</span>
              </button>
              <button>
                <div className="iconStyle">🏠</div>
                <span className="fontSpan">123</span>
              </button>
              <button>
                <div className="iconStyle">🏠</div>
                <span className="fontSpan">123</span>
              </button>
              <button>
                <div className="iconStyle">🏠</div>
                <span className="fontSpan">123</span>
              </button>
            </div>
          </div>
          <div>
            <div style={{ backgroundColor: "#F8ECEC" }}>
              <div className="introSection">
                <div className="notesSection">
                  <span className="imgFont">保母自介</span>
                </div>
              </div>
            </div>
          </div>
          <div className="criticismSection">
            <span className="criticalFont">保母評語</span>
            <div className="criticismContent">
              <div className="criticismContentTitleLayout">
                <div className="criticismContentTitle">
                  <span className="criticismName">王美麗</span>
                  <span className="criticismSubTitle">2025-01-01</span>
                </div>
                <RatingComponent score={3.7} size="small" />
              </div>
              <div className="criticismContentTextLayout">
                <span className="criticismText">
                  文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文...
                </span>
              </div>
            </div>

            <div className="buttonLayout">
              <button className="submitButton" onClick={handleBookingClick}>
                + 馬上預約
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_304_31413)">
                  <path
                    d="M14.7782 5.22943C14.4824 4.93364 14.0045 4.93364 13.7088 5.22943L10 8.9306L6.29124 5.22184C5.99545 4.92605 5.51763 4.92605 5.22184 5.22184C4.92605 5.51763 4.92605 5.99545 5.22184 6.29124L8.9306 10L5.22184 13.7088C4.92605 14.0045 4.92605 14.4824 5.22184 14.7782C5.51763 15.0739 5.99545 15.0739 6.29124 14.7782L10 11.0694L13.7088 14.7782C14.0045 15.0739 14.4824 15.0739 14.7782 14.7782C15.0739 14.4824 15.0739 14.0045 14.7782 13.7088L11.0694 10L14.7782 6.29124C15.0664 6.00303 15.0664 5.51763 14.7782 5.22943Z"
                    fill="#252525"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_304_31413">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <span className="modalTitle">確認向此保母發送托育服務需求</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <button className="cancelBtn" onClick={handleCloseModal}>
                取消
              </button>
              <button className="confirmBtn">確認</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
