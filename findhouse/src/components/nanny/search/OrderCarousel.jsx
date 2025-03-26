import React, { useState, useRef, useEffect } from "react";
import "./orderCarousal.css";
import { useRouter } from "next/router";
import useStore from "../../../lib/store";


const OrderCarousel = ({ orderList, handleNextClick = () => { }, itemsPerPage = 1,setIsShow,isShow }) => {
  const router = useRouter();
  const { babyInfo,setBabyInfo } = useStore();
  const { careData,setCareData } = useStore();

  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const [isShowMap, setIsShowMap] = useState(
    orderList.reduce((acc, order) => {
      acc[order.id] = order.isShow;
      return acc;
    }, {})
  );

  const fetchCareData = async (careId) => {
    const response = await fetch(`/api/base/getCareData?id=${careId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch care data");
    }
  
    const data = await response.json();
    setCareData(data.data);
  };
  

  const goToEdit = (order) => {
    fetchCareData(order.caretypeid);
    setBabyInfo(order);
    router.push("/parent/search/create/choose");
  };

  const scrollRef = useRef(null);

  const handleOrderPageChange = (newPage) => {
    setOrderCurrentPage(newPage);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: (newPage - 1) * scrollRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const handleVisibilityToggle = async (orderId) => {
    try {
      const currentIsShow = isShowMap[orderId];
      const response = await fetch(`/api/order/updateIsShow`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isShow: !currentIsShow,
          id: orderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update visibility");
      }
      setIsShow(!currentIsShow);

      setIsShowMap((prev) => ({ ...prev, [orderId]: !currentIsShow }));
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  useEffect(() => {
    // 初始化 isShowMap 確保每次 orderList 變更時同步更新
    setIsShowMap(
      orderList.reduce((acc, order) => {
        acc[order.id] = order.isshow;
        return acc;
      }, {})
    );
  }, [orderList]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const newIndex = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth) + 1;
        setOrderCurrentPage(newIndex);
        setIsShow(orderList[newIndex - 2]?.isshow);
        setIsShowMap((prevMap) => {
          const newMap = { ...prevMap };
          orderList.forEach((order) => {
            if (!(order.id in newMap)) {
              newMap[order.id] = order.isshow;
            }
          });
          return newMap;
        });
      }
    };
    
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [orderList]);

  // Using an array for mapping
  const weekdayArray = ["", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

  const convertWeekdays = (weekdays) => {
    if (!weekdays) return "無資料";
    if (Array.isArray(weekdays)) {
      return weekdays.map(day => weekdayArray[day]).join('、');
    }
    if (typeof weekdays === 'string') {
      return weekdays.split(',').map(day => weekdayArray[day]).join('、');
    }
    if (typeof weekdays === 'number') {
      return weekdayArray[weekdays] || "無資料";
    }
    
    return "無資料";
  };

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          scrollbarWidth: "none", // Firefox 隱藏滾動條
          msOverflowStyle: "none", // IE/Edge 隱藏滾動條
          marginTop:"14px",
        }}
      >
        {/* 新增訂單資料區塊 */}
        <div className="addOrder">
          <div key={-1} className="zero" onClick={handleNextClick}>
            <span className="zero-text">+ 新增訂單</span>
          </div>
          <div className="iconLayout" style={{ position: "relative", zIndex: 11 }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect width="38" height="38" rx="4" fill="#F2F2F2"/>
                <path d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z" fill="#CCCCCC"/>
              </svg>
            </div>
            <div className="addIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
                <path d="M23.8209 8.181C22.9429 6.261 19.4999 0 11.9999 0C4.49987 0 1.05687 6.261 0.178871 8.181C0.0610095 8.4383 0 8.71799 0 9.001C0 9.28401 0.0610095 9.5637 0.178871 9.821C1.05687 11.739 4.49987 18 11.9999 18C19.4999 18 22.9429 11.739 23.8209 9.819C23.9385 9.56199 23.9994 9.28265 23.9994 9C23.9994 8.71735 23.9385 8.43801 23.8209 8.181ZM11.9999 15C10.8132 15 9.65315 14.6481 8.66645 13.9888C7.67976 13.3295 6.91072 12.3925 6.45659 11.2961C6.00247 10.1997 5.88365 8.99334 6.11516 7.82946C6.34667 6.66557 6.91812 5.59647 7.75723 4.75736C8.59635 3.91824 9.66544 3.3468 10.8293 3.11529C11.9932 2.88378 13.1996 3.0026 14.296 3.45672C15.3923 3.91085 16.3294 4.67988 16.9887 5.66658C17.648 6.65327 17.9999 7.81331 17.9999 9C17.9983 10.5908 17.3656 12.116 16.2408 13.2409C15.1159 14.3658 13.5907 14.9984 11.9999 15Z" fill="#CCCCCC"/>
                <path d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" fill="#CCCCCC"/>
              </svg>
            </div>
          </div>
        </div>

        {orderList.map((order, index) => (
          <div key={index} className="order-item" style={{ minWidth: "100%", position: "relative" }}>
            {!isShowMap[order.id] && (
              <div className="overlay" style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 10,
                pointerEvents: "none" // 讓 icon 可點擊
              }}></div>
            )}
            <img
              src={order.image || "/orderCreate.png"}
              className="order-item-image"
              alt="Order Icon"
            />
            <div className="order-item-text">
              <span className="name">{order.nickname}</span>
              <div className="order-item-text-careType">
                <div className="careType">
                  {order.choosetype === "suddenly"
                    ? "臨時托育"
                    : order.choosetype === "longTern"
                      ? "長期托育"
                      : order.choosetype}
                </div>
                <div className="scenario">
                  {order.scenario === "home"
                    ? "在宅托育"
                    : order.scenario === "toHome"
                      ? "到宅托育"
                      : order.scenario === "infantCareCenter"
                        ? "定點托育"
                        : "無資料"}
                </div>
              </div>
              <div className="time">
                <span className="time-text">托育時間:</span>
                {order.choosetype === "suddenly" ? (
                  <span className="time-text">
                    {(order?.start_date ?? '').slice(0, 10)}~
                    {(order?.end_date ?? '').slice(0, 10)}
                  </span>
                ) : (
                  <span className="time-text">
                    {convertWeekdays(order?.weekdays)}
                  </span>
                )}
              </div>
            </div>
            <div className="iconLayout" style={{ position: "relative", zIndex: 11 }}>
              <div onClick={() => goToEdit(order)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                  <path d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z" fill="#E3838E" />
                </svg>
              </div>
              <div onClick={() => handleVisibilityToggle(order.id,order.isshow)}>
                    {isShowMap[order.id] ? <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                    >
                      <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                      <path
                        d="M30.8209 18.2351C29.8547 16.2781 28.4397 14.5436 26.6759 13.1543L29.7079 10.3225L28.2929 9L24.9999 12.0728C23.1772 11.0881 21.1054 10.5776 18.9999 10.5943C11.4999 10.5943 8.05687 16.4419 7.17887 18.2351C7.06101 18.4754 7 18.7366 7 19.0009C7 19.2653 7.06101 19.5265 7.17887 19.7668C8.14501 21.7237 9.56009 23.4583 11.3239 24.8476L8.29287 27.6794L9.70687 29L12.9999 25.9272C14.8225 26.9119 16.8944 27.4224 18.9999 27.4057C26.4999 27.4057 29.9429 21.5581 30.8209 19.7649C30.9385 19.5249 30.9994 19.264 30.9994 19C30.9994 18.736 30.9385 18.4751 30.8209 18.2351ZM12.9999 19C12.998 17.9713 13.2998 16.9621 13.8721 16.0832C14.4445 15.2043 15.2652 14.4899 16.244 14.0183C17.2229 13.5468 18.322 13.3364 19.4206 13.4104C20.5191 13.4844 21.5745 13.8398 22.4709 14.4376L21.0189 15.7937C20.4093 15.4504 19.7117 15.2674 18.9999 15.2641C17.939 15.2641 16.9216 15.6577 16.1714 16.3583C15.4213 17.0589 14.9999 18.0092 14.9999 19C15.0034 19.6648 15.1993 20.3164 15.5669 20.8857L14.1149 22.2418C13.3898 21.2965 12.9999 20.1628 12.9999 19ZM18.9999 24.6038C17.7548 24.6038 16.541 24.2396 15.5289 23.5624L16.9809 22.2063C17.5904 22.5496 18.2881 22.7326 18.9999 22.7359C20.0607 22.7359 21.0782 22.3423 21.8283 21.6417C22.5784 20.941 22.9999 19.9908 22.9999 19C22.9964 18.3352 22.8005 17.6836 22.4329 17.1143L23.8849 15.7582C24.5249 16.5953 24.9055 17.5811 24.9847 18.6071C25.0639 19.6331 24.8386 20.6596 24.3338 21.5739C23.8289 22.4881 23.0639 23.2546 22.1229 23.7891C21.1819 24.3237 20.1013 24.6056 18.9999 24.6038Z"
                        fill="#E3838E"
                      />
                    </svg> : <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                    >
                      <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                      <g transform="translate(7, 10)">
                        <path
                          d="M23.8209 8.181C22.9429 6.261 19.4999 0 11.9999 0C4.49987 0 1.05687 6.261 0.178871 8.181C0.0610095 8.4383 0 8.71799 0 9.001C0 9.28401 0.0610095 9.5637 0.178871 9.821C1.05687 11.739 4.49987 18 11.9999 18C19.4999 18 22.9429 11.739 23.8209 9.819C23.9385 9.56199 23.9994 9.28265 23.9994 9C23.9994 8.71735 23.9385 8.43801 23.8209 8.181ZM11.9999 15C10.8132 15 9.65315 14.6481 8.66645 13.9888C7.67976 13.3295 6.91072 12.3925 6.45659 11.2961C6.00247 10.1997 5.88365 8.99334 6.11516 7.82946C6.34667 6.66557 6.91812 5.59647 7.75723 4.75736C8.59635 3.91824 9.66544 3.3468 10.8293 3.11529C11.9932 2.88378 13.1996 3.0026 14.296 3.45672C15.3923 3.91085 16.3294 4.67988 16.9887 5.66658C17.648 6.65327 17.9999 7.81331 17.9999 9C17.9983 10.5908 17.3656 12.116 16.2408 13.2409C15.1159 14.3658 13.5907 14.9984 11.9999 15Z"
                          fill="#E3838E"
                        />
                        <path
                          d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                          fill="#E3838E"
                        />
                      </g>
                    </svg>}
                </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {Array.from(
          { length: orderList.length + 1 }, // 確保 pagination 長度正確
          (_, i) => (
            <span
              key={i}
              onClick={() => handleOrderPageChange(i + 1)}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: orderCurrentPage === i + 1 ? "#CCC" : "#F2F2F2",
                margin: "0 5px",
                cursor: "pointer",
                display: "inline-block",
              }}
            ></span>
          )
        )}
      </div>
    </div>
  );
};

export default OrderCarousel;
