import React, { useState } from 'react';
import ServiceSchedule from '../../../components/base/ServiceSchedule';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nannyInfo, setNannyInfo] = useState({});
  // 圖片數組，可以替換成你想要展示的圖片路徑
  const images = [
    '/static/image1.jpg',
    '/static/image2.jpg',
    '/static/image3.jpg',
  ];

  // 處理點擊圓點來跳轉到對應圖片
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const fetchNannyInfo = async () => {
      if (!router.isReady) return; // 等待路由準備就緒
      if (!id) return;
      
      try {
        const response = await fetch(`/api/nanny/getNannyInfo?id=${id}`);
        const data = await response.json();
        setNannyInfo(data.nannies[0]);
      } catch (error) {
        console.error('Failed to fetch nanny info:', error);
      }
    };
    
    fetchNannyInfo();
  }, [id, router.isReady]); // 添加 router.isReady 作為依賴

  console.log(nannyInfo);

  const serviceNames = {
    '1': '可接送小朋友',
    '2': '可遠端查看育兒情形',
    '3': '製作副食品',
    '4': '可配合不使用3C育兒',
    '5': '寶寶衣物清洗',
    '6': '可配合家長外出'
  };

  return (
    <div className="container">

      {/* Profile Section */}
      <div className="profileSection">
        
        <img className="profilePic" src="/assets/images/resource/error.png" alt="Profile" /> {/* 頭貼圓形 */}
        <h2 className="profileName">王美麗</h2>
        <div className="rating">
          {nannyInfo.score}
        </div>

        <div className='profile-section'>
            <div className='part'>
                <span className='part-title'>經驗</span>
                <span className='part-subTitle'>{nannyInfo.experienment}</span>
            </div>
            <div className='part'>
                <span className='part-title'>年紀</span>
                <span className='part-subTitle'>{nannyInfo.age}</span>
            </div>
            <div className='part'>
                <span className='part-title'>托育</span>
                <span className='part-subTitle'>{nannyInfo.kidcount}</span>
            </div>
        </div>

          {/* Tabs */}
        <div className="tabs">
          <button className="tab active">
              <span className='tab-tile'>
                  托育方式
              </span>
              <span className='tab-subTitle'>
                  {nannyInfo.way}
              </span>
          </button>
          <div className='mid-border'></div>
          <button className="tab">
              <span className='tab-tile'>
                  托育情境
              </span>
              <span className='tab-subTitle'>
                  {nannyInfo.scenario}
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
          {nannyInfo.environmentPic && nannyInfo.environmentPic.length > 0 && (
            <div className="dotsContainer">
              {nannyInfo.environmentPic.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          )}
        </div>

        <ServiceSchedule></ServiceSchedule>

            {/* Icon Navigation */}
        <div style={{backgroundColor:'#F3CCD4'}}>
          <div style={{backgroundColor:'#F3CCD4'}}>
          <div className="iconNav">
            {['1', '2', '3', '4', '5', '6'].map((number) => (
                <div key={number} style={{
                    display: 'flex',
                    width: '48px',
                    height: '76px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div className={`iconStyle ${nannyInfo.service?.includes(number) ? 'active' : 'inactive'}`}>
                        {number === '1' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M23.861 8H13V0H15C15.083 0 22.746 0.0999999 23.861 8ZM5.5 10L4 8C3.53293 7.38045 2.92873 6.87747 2.23476 6.53049C1.54078 6.1835 0.775884 6.00193 0 6L0 8C0.46553 8.00116 0.924469 8.1101 1.34085 8.31829C1.75724 8.52648 2.11976 8.82827 2.4 9.2L4 11.333V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H11.865L9.257 19.129C7.935 18.511 5.837 20.046 6.004 21.64C6.02797 22.0042 6.13163 22.3586 6.30766 22.6783C6.48369 22.998 6.7278 23.2752 7.02272 23.4901C7.31764 23.7051 7.65618 23.8527 8.01442 23.9224C8.37265 23.9922 8.74183 23.9824 9.09586 23.8937C9.44989 23.8051 9.78013 23.6398 10.0632 23.4095C10.3463 23.1792 10.5754 22.8895 10.7342 22.5609C10.8931 22.2323 10.9778 21.8728 10.9824 21.5079C10.987 21.143 10.9115 20.7815 10.761 20.449L14 16.562L17.239 20.449C17.0904 20.7814 17.0164 21.1423 17.0223 21.5063C17.0282 21.8704 17.1138 22.2287 17.2731 22.5561C17.4323 22.8835 17.6614 23.1721 17.9442 23.4014C18.2269 23.6308 18.5565 23.7954 18.9097 23.8837C19.263 23.972 19.6312 23.9818 19.9887 23.9124C20.3461 23.8431 20.684 23.6963 20.9785 23.4823C21.2731 23.2683 21.5172 22.9924 21.6937 22.6739C21.8702 22.3555 21.9747 22.0022 22 21.639C22.167 20.047 20.069 18.51 18.747 19.129L16.135 16H21C21.7956 16 22.5587 15.6839 23.1213 15.1213C23.6839 14.5587 24 13.7956 24 13V10H5.5Z" fill="#E3838E"/>
                            </svg>
                        ) : number === '2' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 10C15 11.654 13.654 13 12 13C10.346 13 9 11.654 9 10C9 8.346 10.346 7 12 7C13.654 7 15 8.346 15 10ZM22 10C22 15.514 17.514 20 12 20C6.486 20 2 15.514 2 10C2 4.486 6.486 0 12 0C17.514 0 22 4.486 22 10ZM17 10C17 7.243 14.757 5 12 5C9.243 5 7 7.243 7 10C7 12.757 9.243 15 12 15C14.757 15 17 12.757 17 10ZM18.429 20.128C16.569 21.313 14.363 22 12 22C9.637 22 7.429 21.312 5.569 20.127C5.474 20.27 5.384 20.415 5.299 20.565C4.892 21.285 4.898 22.143 5.316 22.858C5.733 23.573 6.475 24 7.302 24H16.696C17.522 24 18.265 23.573 18.684 22.858C19.1 22.147 19.108 21.295 18.705 20.58C18.618 20.426 18.526 20.274 18.429 20.128Z" fill="#E3838E"/>
                          </svg>
                        ) : number === '3' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M24 8C24 5.625 22.029 0 18.922 0C15.86 0 14 5.557 14 8C14 10.414 15.721 12.434 18 12.899V24H20V12.899C22.279 12.434 24 10.415 24 8ZM16 14.323C13.609 13.183 12 10.738 12 8C12 6.717 12.423 4.562 13.327 2.579C12.285 2.211 11.168 2 10 2C4.477 2 0 6.477 0 12C0 17.523 4.477 22 10 22C12.254 22 14.327 21.245 16 19.986V14.323ZM11 12.414L7.707 15.707L6.293 14.293L9 11.586V7H11V12.414Z" fill="#F8ECEC"/>
                          </svg>
                        ) : number === '4' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M14.5011 14.999C13.6721 14.999 13.0011 15.67 13.0011 16.499V17.999H3.00108V5.499C3.00108 4.121 4.12308 2.999 5.50108 2.999H10.5011C11.6431 2.999 12.6391 3.77 12.9221 4.873C13.1291 5.675 13.9471 6.161 14.7481 5.952C15.5511 5.745 16.0341 4.928 15.8271 4.126C15.2021 1.696 13.0121 3.03906e-07 10.5001 3.03906e-07H5.50008C2.46808 -0.000999696 0.00107639 2.466 0.00107639 5.499C0.00107639 5.499 -0.0189236 19.204 0.00107639 19.301C0.00107639 21.999 2.34308 23.999 5.00108 23.999H11.0011C13.3671 23.999 15.6641 22.22 16.0011 19.499V16.499C16.0011 15.67 15.3301 14.999 14.5011 14.999ZM9.00108 21.999H7.00108C6.44908 21.999 6.00108 21.551 6.00108 20.999C6.00108 20.447 6.44908 19.999 7.00108 19.999H9.00108C9.55308 19.999 10.0011 20.447 10.0011 20.999C10.0011 21.551 9.55308 21.999 9.00108 21.999Z" fill="#E3838E"/>
                            <path d="M24.1139 9.00042V8.67942C24.1139 8.23942 23.9689 7.81042 23.6999 7.46142L21.2229 4.23442C20.5009 3.36842 19.2149 3.25142 18.3489 3.97342C17.4829 4.69542 17.3659 5.98142 18.0879 6.84742L18.9229 7.99942L11.5349 7.98642C10.5769 7.98642 9.82995 8.86942 10.0859 9.87042C10.2609 10.5524 10.9249 10.9994 11.6289 10.9994H15.7979L17.3329 16.3734C17.9429 18.5084 19.9199 19.9994 22.1409 19.9994H22.5009C23.3299 19.9994 24.0009 19.3284 24.0009 18.4994C24.0009 17.6704 23.3299 16.9994 22.5009 16.9994H22.1409C21.2529 16.9994 20.4619 16.4024 20.2179 15.5484L18.9179 10.9994H22.1159C23.2209 10.9994 24.1159 10.1044 24.1159 8.99942L24.1139 9.00042Z" fill="#E3838E"/>
                          </svg>
                        ) : number === '5' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17 0H7C4.243 0 2 2.243 2 5V19C2 21.757 4.243 24 7 24H17C19.757 24 22 21.757 22 19V5C22 2.243 19.757 0 17 0ZM20 19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19V5C4 3.346 5.346 2 7 2H17C18.654 2 20 3.346 20 5V19ZM6.5 6C5.672 6 5 5.328 5 4.5C5 3.672 5.672 3 6.5 3C7.328 3 8 3.672 8 4.5C8 5.328 7.328 6 6.5 6ZM9 4.5C9 3.672 9.672 3 10.5 3C11.328 3 12 3.672 12 4.5C12 5.328 11.328 6 10.5 6C9.672 6 9 5.328 9 4.5ZM12 8C8.691 8 6 10.691 6 14C6 17.309 8.691 20 12 20C15.309 20 18 17.309 18 14C18 10.691 15.309 8 12 8ZM12 10C14.06 10 15.741 11.571 15.957 13.574C15.683 13.767 15.249 14 14.728 14C13.889 14 12.9 13.417 12.592 13.193C12.425 13.071 10.917 12 9.273 12C9.002 12 8.751 12.035 8.511 12.084C9.192 10.849 10.492 10 12 10ZM12 18C9.94 18 8.259 16.429 8.043 14.426C8.317 14.233 8.751 14 9.272 14C10.111 14 11.1 14.583 11.408 14.807C11.575 14.929 13.083 16 14.727 16C14.998 16 15.249 15.965 15.489 15.916C14.808 17.151 13.508 18 12 18Z" fill="#E3838E"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5C13.381 5 14.5 6.119 14.5 7.5C14.5 8.881 13.381 10 12 10C10.619 10 9.49997 8.881 9.49997 7.5C9.49997 6.119 10.619 5 12 5ZM16 14V17C16 17.883 15.609 18.67 15 19.22V23C15 23.553 14.552 24 14 24C13.448 24 13 23.553 13 23V20H11V23C11 23.553 10.552 24 9.99997 24C9.44797 24 8.99997 23.553 8.99997 23V19.22C8.39097 18.671 7.99997 17.883 7.99997 17V14C7.99997 12.346 9.34597 11 11 11H13C14.654 11 16 12.346 16 14ZM19 5C20.381 5 21.5 3.881 21.5 2.5C21.5 1.119 20.381 0 19 0C17.619 0 16.5 1.119 16.5 2.5C16.5 3.881 17.619 5 19 5ZM23.977 16.628L23.101 9.621C22.844 7.557 21.081 6 19 6C18.036 6 17.149 6.344 16.44 6.908C16.466 7.104 16.5 7.297 16.5 7.5C16.5 8.371 16.24 9.179 15.81 9.868C17.13 10.769 18 12.284 18 14V17C18 18.077 17.643 19.123 17 19.981V20H20V23C20 23.552 20.447 24 21 24C21.553 24 22 23.552 22 23V19.812C22.474 19.643 22.909 19.371 23.249 18.986C23.818 18.341 24.083 17.481 23.977 16.628ZM7.49997 2.5C7.49997 1.119 6.37997 0 4.99997 0C3.61997 0 2.49997 1.119 2.49997 2.5C2.49997 3.881 3.61897 5 4.99997 5C6.38097 5 7.49997 3.881 7.49997 2.5ZM0.750967 18.985C1.09097 19.37 1.52597 19.643 1.99997 19.811V22.999C1.99997 23.551 2.44697 23.999 2.99997 23.999C3.55297 23.999 3.99997 23.551 3.99997 22.999V19.999H6.99997V19.98C6.35697 19.122 5.99997 18.076 5.99997 16.999V13.999C5.99997 12.283 6.86997 10.768 8.18997 9.867C7.75997 9.177 7.49997 8.37 7.49997 7.499C7.49997 7.296 7.53397 7.103 7.55997 6.907C6.85097 6.344 5.96397 5.999 4.99997 5.999C2.91897 5.999 1.15597 7.556 0.898967 9.62L0.0229674 16.628C-0.0830326 17.482 0.180967 18.34 0.750967 18.985Z" fill="#E3838E"/>
                          </svg>
                        )}
                    </div>
                    <span className={`fontSpan ${nannyInfo.service?.includes(number) ? 'active' : 'inactive'}`}>
                        {serviceNames[number]}
                    </span>
                </div>
            ))}
          </div>    
          </div>
          <div style={{backgroundColor:'#F8ECEC'}}>
              <div className="introSection">
                <div className="notesSection">
                  <span className='imgFont'>保母自介</span>
                  <span className='imgFont'>{nannyInfo.introduction}</span>
                </div>
              </div>
          </div>
        </div>

        <div className='buttonLayout'>
          <button className="submitButton">+ 馬上預約</button>
        </div>

      </div>

      <style jsx>{`
        .iconStyle.inactive {
            opacity: 0.5;
        }
        
        .fontSpan.inactive {
            opacity: 0.5;
        }
        
        .iconStyle.active {
            opacity: 1;
        }
        
        .fontSpan.active {
              opacity: 1;
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
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url('/background.png'); // Added background image
          background-repeat: no-repeat; // 防止重疊
          background-size: cover; // 使背景圖像覆蓋整個容器
          border: none;
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
          width:100%;
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
          max-width: 48px;
          max-height: 26px;
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
          width:100%
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
