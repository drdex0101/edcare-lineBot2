import React, { useState, useRef, useEffect } from "react";
import "./orderCarousal.css";
import { useRouter } from "next/router";
import useStore from "../../../lib/store";
import Swal from "sweetalert2";
const OrderCarousel = ({
  orderList,
  itemsPerPage = 1,
  setIsShow,
  isShow,
  haveKyc,
  setOpenKycModal,
  onSelectOrder
}) => {
  const router = useRouter();
  const { babyInfo, setBabyInfo } = useStore();
  const { careData, setCareData } = useStore();
  const { orderId, setOrderId } = useStore();

  const [orderCurrentPage, setOrderCurrentPage] = useState(0);

  const [currentOrder, setCurrentOrder] = useState(orderList[0]);

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

  const goToEdit = async (order) => {
    const result = await Swal.fire({
      title: "確定要修改此訂單嗎？",
      text: "修改訂單將會移除已配對之保母，是否繼續？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
    });

    if (result.isConfirmed) {
      await fetchCareData(order.caretypeid);
      setBabyInfo(order);
      router.push("/parent/search/create/choose");
    }
  };

  const deleteOrder = async (orderId) => {
    const response = await fetch(`/api/order/deleteOrder`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "訂單已刪除",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    }
  };

  const hasInitialized = useRef(false); // ✅ 不會觸發 re-render

  useEffect(() => {
    if (orderList && orderList.length > 0 && !hasInitialized.current) {
      setOrderCurrentPage(1);
      hasInitialized.current = true; // ✅ 不會觸發 render，不會進入循環
    }
  }, [orderList]);
  
  useEffect(() => {
    const index = Math.max(orderCurrentPage - 1, 0);
    const current = orderCurrentPage === 0 ? null : orderList[index];
  
    setCurrentOrder(current);
    setBabyInfo(current);
    setIsShow(current?.isshow ?? false);
    if (current?.id) {
      onSelectOrder(current.id); // ✅ 呼叫父層函式
    }
    else{
      setOrderId(null)
    }
  }, [orderCurrentPage, orderList]);
  
  const handlePreviousClick = () => {
    if (orderCurrentPage > 1) {
      setOrderCurrentPage((prev) => prev - 1);
    } else {
      setOrderCurrentPage(0);
      setCurrentOrder(orderList[0]);
      setBabyInfo(orderList[0]);
      setIsShow(orderList[0]?.isshow);
    }
    console.log("pre", orderCurrentPage);
  };

  const handleNextClick = () => {
    if (orderCurrentPage < orderList.length) {
      setOrderCurrentPage((prev) => prev + 1);
    }
    console.log("next", orderCurrentPage);
  };

  const goToAddOrder = () => {
    setCareData({});
    setBabyInfo({});
    if (!haveKyc) {
      setOpenKycModal(true);
    } else {
      router.push("/parent/search/create/choose");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width:"100%",padding:"0 10px",gap:"10px" }}>
      <button
        className="left-arrow"
        onClick={() => handlePreviousClick()}
        disabled={orderCurrentPage <= 0}
        style={{
          opacity: orderCurrentPage <= 0 ? 0.3 : 1,
          cursor: orderCurrentPage <= 0 ? "not-allowed" : "pointer",
          background: "transparent",
          border: "none",
          marginLeft: "15px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4L8 12L16 20"
            stroke="#E3838E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* 新增訂單資料區塊 */}
      {orderCurrentPage === 0 ? (
        <div key={-1} className="zero" onClick={goToAddOrder}>
          <span className="zero-text">+ 新增小孩資料</span>
        </div>
      ) : (
        <div
          key={orderCurrentPage}
          className="order-item"
        >
          <img
            src={currentOrder?.image || "/orderCreate.png"}
            className="order-item-image"
            alt="Order Icon"
          />
          <div className="order-item-text">
            <span className="name">{currentOrder?.nickname}</span>
            <div className="order-item-text-careType">
              <div className="careType">
                {currentOrder?.care_type === "suddenly"
                  ? "臨時托育"
                  : currentOrder?.care_type === "longTern"
                    ? "長期托育"
                    : currentOrder?.care_type}
              </div>
              <div className="scenario">
                {currentOrder?.scenario === "home"
                  ? "在宅托育"
                  : currentOrder?.scenario === "toHome"
                    ? "到宅托育"
                    : currentOrder?.scenario === "infantCareCenter"
                      ? "定點托育"
                      : "無資料"}
              </div>
            </div>
            <div className="time">
              <span className="time-text">托育時間:</span>
              {currentOrder?.care_type === "suddenly" ? (
                <>
                  <span className="time-text">
                    日期: {(currentOrder?.start_date ?? "").slice(0, 10)}
                  </span>
                  <span className="time-text">
                  時間: {currentOrder?.start_time ?? "--"} ~ {currentOrder?.end_time ?? "--"}
                  </span>
                </>
              ) : (
                <span className="time-text">
                  {(currentOrder?.start_date ?? "").slice(0, 10)}<br/>~
                  {(currentOrder?.end_date ?? "").slice(0, 10)}
                </span>
              )}
            </div>
          </div>
          <div
            className="iconLayout"
            style={{ position: "relative", zIndex: 11 }}
          >
            <div onClick={() => goToEdit(currentOrder)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
              >
                <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                <path
                  d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z"
                  fill="#E3838E"
                />
              </svg>
            </div>
            <div onClick={() => deleteOrder(currentOrder?.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
              >
                <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                <path
                  d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#E3838E"
                  transform="translate(8,6)"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <button
        className="left-arrow"
        onClick={() => handleNextClick()}
        disabled={orderCurrentPage >= orderList.length}
        style={{
          opacity: orderCurrentPage >= orderList.length ? 0.3 : 1,
          cursor:
            orderCurrentPage >= orderList.length ? "not-allowed" : "pointer",
          background: "transparent",
          border: "none",
          marginRight: "25px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4L16 12L8 20"
            stroke="#E3838E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default OrderCarousel;
