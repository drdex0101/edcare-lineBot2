// pages/history/[id].js

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import "./historyId.css";
import SettingForParent from "../../../components/base/SettingForParent";
import Loading from "../../../components/base/Loading";
import Swal from "sweetalert2";

export default function HistoryId() {
  const [orderInfo, setOrderInfo] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [nannyInfo, setNannyInfo] = useState(null);
  const getNannyInfo = async (nannyId) => {
    const response = await fetch(`/api/nanny/getNannyInfo?id=${nannyId}`);
    const data = await response.json();
    setNannyInfo(data.nannies[0]);
  };

  useEffect(() => {
    if (!router.isReady) return; // 等待路由准备完毕
    const { id } = router.query;
    fetchOrderInfo(id);
  }, [router.isReady]);

  const fetchOrderInfo = async (id) => {
    try {
      const response = await fetch(`/api/order/getOrderInfoById?id=${id}`);
      const data = await response.json();
      if (data.orders) {
        setOrderInfo(data.orders[0]);
        if (data.orders[0].nannyid) {
          getNannyInfo(data.orders[0].nannyid);
        }
      } else {
        console.error("API 响应中缺少 'orders' 属性:", data);
      }
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "訂單資訊取得失敗",
        confirmButtonText: "確定",
      });
      console.error(error);
      setIsLoading(false);
    }
  };

  const orderStatusSteps = [
    { key: "create", label: "媒合中" },
    { key: "matchByParent" || "matchByNanny", label: "預約中" },
    { key: "signing", label: "簽約中" },
    { key: "onGoing", label: "合約履行中" },
    { key: "finish", label: "已完成" },
  ];

  const careTime = [
    { key: "morning", label: "日間" },
    { key: "allDay", label: "全日" },
    { key: "night", label: "夜間" },
  ];

  // 確保 orderInfo 存在
  const currentStatus = orderInfo?.status || "create";

  // 找到目前 status 在列表中的索引
  const currentIndex = orderStatusSteps.findIndex((step) => step.key === currentStatus);

  // Function to get the label for a given care_time key
  const getCareTimeLabel = (careTimeKey) => {
    const careTimeItem = careTime.find(item => item.key === careTimeKey);
    return careTimeItem ? careTimeItem.label : "無資料";
  };

  // Update this helper function to handle both array and string inputs
  const convertWeekdaysToString = (weekdays) => {
    if (!weekdays) return "無資料";
    const weekdayMap = {
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
      7: "星期日"
    };

    // Handle both array and string inputs
    const weekdayArray = Array.isArray(weekdays) 
      ? weekdays 
      : weekdays.split(",").map(day => day.trim());

    return weekdayArray
      .map(day => weekdayMap[day])
      .join(", ");
  };

  const styles = {
    loadingContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',  // 半透明白色背景
      zIndex: 9999  // 確保在最上層
    }
  };

  return (
    <div className="history-main">
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <>
          <div className="history-header">
            <img
              src="/icon/arrowForward.svg"
              alt="back"
              onClick={() => router.back()}
            />
            <SettingForParent />
          </div>

          <div className="history-body-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              viewBox="0 0 25 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.03375 1.03375C3.15554e-07 2.06748 0 3.73126 0 7.05882V22.9412C0 26.2687 3.15554e-07 27.9325 1.03375 28.9662C2.06748 30 3.73126 30 7.05882 30H17.6471C20.9746 30 22.6384 30 23.6721 28.9662C24.7059 27.9325 24.7059 26.2687 24.7059 22.9412V7.05882C24.7059 3.73126 24.7059 2.06748 23.6721 1.03375C22.6384 3.15554e-07 20.9746 0 17.6471 0H7.05882C3.73126 0 2.06748 3.15554e-07 1.03375 1.03375ZM7.05882 7.05882C6.08421 7.05882 5.29412 7.84892 5.29412 8.82353C5.29412 9.79814 6.08421 10.5882 7.05882 10.5882H17.6471C18.6217 10.5882 19.4118 9.79814 19.4118 8.82353C19.4118 7.84892 18.6217 7.05882 17.6471 7.05882H7.05882ZM7.05882 14.1176C6.08421 14.1176 5.29412 14.9077 5.29412 15.8824C5.29412 16.857 6.08421 17.6471 7.05882 17.6471H17.6471C18.6217 17.6471 19.4118 16.857 19.4118 15.8824C19.4118 14.9077 18.6217 14.1176 17.6471 14.1176H7.05882ZM7.05882 21.1765C6.08421 21.1765 5.29412 21.9665 5.29412 22.9412C5.29412 23.9158 6.08421 24.7059 7.05882 24.7059H14.1176C15.0923 24.7059 15.8824 23.9158 15.8824 22.9412C15.8824 21.9665 15.0923 21.1765 14.1176 21.1765H7.05882Z"
                fill="#402626"
              />
            </svg>
            <span className="history-body-header-title">歷史訂單</span>
          </div>

          <div className="order-info-layout">
            {orderInfo && (
              <div className="about-baby-layout">
                <span className="sub-title-font">訂單編號：{orderInfo.id}</span>
                <span className="sub-title-font">
                  建立時間：{orderInfo.created_ts.slice(0, 10)}
                </span>
                <div className="about-baby-img-layout">
                  <div className="about-baby-img-background">
                    <img src="/orderCreate.png" alt="" />
                  </div>
                  <span>{orderInfo.nickname}</span>
                </div>
                <span className="sub-title-font">
                  托育方式：
                  {orderInfo.choosetype
                    ? orderInfo.choosetype === "suddenly"
                      ? "臨時托育"
                      : "長期托育"
                    : "無資料"}
                </span>
                <span className="sub-title-font">
                  托育時間：
                  {orderInfo.choosetype === "suddenly"
                    ? getCareTimeLabel(orderInfo.care_time)
                    : getCareTimeLabel(orderInfo.care_time)}
                </span>
                <span className="sub-title-font">
                  托育日期：
                  {orderInfo.choosetype === "suddenly"
                    ? `${orderInfo?.start_date?.slice(0, 10) || "無資料"} ~ ${orderInfo?.end_date?.slice(0, 10) || "無資料"}`
                    : convertWeekdaysToString(orderInfo.weekdays) + " " + getCareTimeLabel(orderInfo.care_time)}
                </span>
                <span className="sub-title-font">
                  托育情境：
                  {orderInfo.scenario === "home"
                    ? "在宅托育"
                    : orderInfo.scenario === "infantCareCenter"
                      ? "定點托育"
                      : orderInfo.scenario === "toHome"
                        ? "到宅托育"
                        : "無資料"}
                </span>
                <span className="sub-title-font">
                  托育地址：
                  {orderInfo.choosetype === "suddenly"
                    ? orderInfo?.location || "無資料"
                    : "無資料"}
                </span>
              </div>
            )}

            <div className="status-layout">
              <span className="title-font">訂單狀態</span>
              <div className="status-process-layout">
                {orderStatusSteps.map((step, index) => (
                  <div key={step.key} className={index <= currentIndex ? "status-process-on" : "status-process-off"}>
                    <span className={index <= currentIndex ? "status-process-font-on" : "status-process-font-off"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {orderInfo && (
              <div className="about-nanny">
                <span className="title-font">托育人員</span>
                <div className="about-nanny-font-layout">
                  <span className="sub-title-font">
                    保母姓名：{nannyInfo?.name ? nannyInfo?.name : "無"}
                  </span>
                  <span className="sub-title-font">
                    配對時間：
                    {orderInfo && orderInfo.status === "matching" && orderInfo.update_ts
                      ? orderInfo.update_ts.slice(0, 10)
                      : "無資料"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
