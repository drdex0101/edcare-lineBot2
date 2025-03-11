// pages/history/[id].js

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import "./historyId.css";
import SettingForParent from "../../../components/base/SettingForParent";

export default function HistoryId() {
  const [orderInfo, setOrderInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // 等待路由准备完毕
    const { id } = router.query;
    fetchOrderInfo(id);
  }, [router.isReady]);

  const fetchOrderInfo = async (id) => {
    try {
      const response = await fetch(`/api/order/getOrderInfoById?id=${id}`);
      const data = await response.json();
      console.log(data);
      if (data.orders) {
        setOrderInfo(data.orders[0]);
      } else {
        console.error("API 响应中缺少 'orders' 属性:", data);
      }
    } catch (error) {
      console.error("获取订单信息时出错:", error);
    }
  };

  return (
    <div className="history-main">
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
                ? orderInfo.suddenly_care_time || "無資料"
                : orderInfo.long_term_care_time || "無資料"}
            </span>
            <span className="sub-title-font">
              托育日期：
              {orderInfo.choosetype === "suddenly"
                ? `${orderInfo.suddenly_start_date.slice(0, 10) || "無資料"} ~ ${orderInfo.suddenly_end_date.slice(0, 10) || "無資料"}`
                : orderInfo.long_term_care_time || "無資料"}
            </span>
            <span className="sub-title-font">
              托育情境：
              {orderInfo.choosetype === "suddenly"
                ? orderInfo.suddenly_scenario || "無資料"
                : orderInfo.long_term_scenario || "無資料"}
            </span>
            <span className="sub-title-font">
              托育地址：
              {orderInfo.choosetype === "suddenly"
                ? orderInfo.suddenly_location || "無資料"
                : "無資料"}
            </span>
          </div>
        )}

        <div className="status-layout">
          <span className="title-font">訂單狀態</span>
          <div className="status-process-layout">
            <div className="status-process-on">
              <span className="status-process-font-on">媒合中</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">預約中</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">簽約中</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">合約履行中</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">已完成</span>
            </div>
          </div>
        </div>

        {orderInfo && (
          <div className="about-nanny">
            <span className="title-font">托育人員</span>
            <div className="about-nanny-font-layout">
              <span className="sub-title-font">
                保母姓名：{orderInfo.name ? orderInfo.name : "無"}
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
    </div>
  );
}
