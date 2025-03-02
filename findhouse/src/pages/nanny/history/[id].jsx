// pages/history/[id].js

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import "./historyId.css";
import Loading from "../../../components/base/Loading";
export default function HistoryId() {
  const [orderInfo, setOrderInfo] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!router.isReady) return; // 等待路由准备完毕
    const { id } = router.query;
    fetchOrderInfo(id);
  }, [router.isReady]);

  const fetchOrderInfo = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/order/getOrderInfoById?id=${id}`);
      const data = await response.json();
      console.log(data);
      if (data.orders) {
        setOrderInfo(data.orders[0]);
      } else {
        console.error("API 响应中缺少 'orders' 属性:", data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("获取订单信息时出错:", error);
    }
  };

  return (
    <div className="history-main">
      {isLoading && (
        <div
          style={{
            position: "fixed", // 確保 Loading 覆蓋整個畫面
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 透明度
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // 確保 Loading 在最上層
          }}
        >
          <Loading />
        </div>
      )}
      <div className="history-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M9 6.78512C8.36422 6.78512 7.74272 6.97365 7.21408 7.32687C6.68545 7.68009 6.27343 8.18214 6.03013 8.76952C5.78683 9.35691 5.72317 10.0033 5.8472 10.6268C5.97124 11.2504 6.2774 11.8232 6.72696 12.2727C7.17652 12.7223 7.74931 13.0284 8.37287 13.1525C8.99643 13.2765 9.64278 13.2129 10.2302 12.9696C10.8175 12.7263 11.3196 12.3142 11.6728 11.7856C12.026 11.257 12.2146 10.6355 12.2146 9.99968C12.212 9.14791 11.8725 8.33175 11.2702 7.72945C10.6679 7.12716 9.85177 6.78766 9 6.78512ZM15.9402 9.99968C15.9386 10.3001 15.9166 10.6 15.8743 10.8974L17.8308 12.4291C17.916 12.4994 17.9734 12.5978 17.9928 12.7066C18.0122 12.8154 17.9922 12.9275 17.9365 13.023L16.0857 16.2183C16.0294 16.3128 15.9416 16.3846 15.8377 16.4208C15.7338 16.457 15.6204 16.4555 15.5175 16.4164L13.2171 15.4922C12.7381 15.861 12.2139 16.1672 11.6572 16.4031L11.3133 18.8454C11.294 18.9548 11.2374 19.0541 11.153 19.1263C11.0687 19.1986 10.9618 19.2393 10.8508 19.2416H7.14921C7.04018 19.2394 6.93509 19.2004 6.85109 19.1309C6.76709 19.0613 6.70915 18.9653 6.68672 18.8586L6.34276 16.4164C5.78458 16.1832 5.26 15.8765 4.78289 15.5046L2.48247 16.4288C2.37964 16.468 2.2663 16.4696 2.16238 16.4334C2.05847 16.3973 1.97062 16.3256 1.9143 16.2311L0.0635113 13.0362C0.007802 12.9408 -0.0121561 12.8287 0.00720345 12.7199C0.026563 12.6111 0.0839787 12.5127 0.16919 12.4424L2.12565 10.9106C2.08392 10.6087 2.06191 10.3044 2.05976 9.99968C2.06143 9.69932 2.08344 9.39941 2.12565 9.10202L0.16919 7.57028C0.0839787 7.49992 0.026563 7.40155 0.00720345 7.29275C-0.0121561 7.18396 0.007802 7.07182 0.0635113 6.97639L1.9143 3.78111C1.97056 3.68652 2.05838 3.6148 2.1623 3.57857C2.26622 3.54233 2.37959 3.54391 2.48247 3.58301L4.78289 4.5072C5.26191 4.13833 5.78612 3.83221 6.34276 3.59627L6.68672 1.15401C6.70597 1.04461 6.76261 0.945296 6.84697 0.873032C6.93133 0.800769 7.03816 0.760042 7.14921 0.757812H10.8508C10.9598 0.759935 11.0649 0.798955 11.1489 0.868505C11.2329 0.938054 11.2909 1.03402 11.3133 1.14075L11.6572 3.58301C12.2161 3.81606 12.7414 4.12268 13.2191 4.49474L15.5175 3.57056C15.6204 3.53141 15.7337 3.52978 15.8376 3.56594C15.9415 3.6021 16.0294 3.67373 16.0857 3.76825L17.9365 6.96353C17.9922 7.05896 18.0122 7.1711 17.9928 7.2799C17.9734 7.38869 17.916 7.48706 17.8308 7.55742L15.8743 9.08916C15.9161 9.39091 15.9381 9.69507 15.9402 9.99968Z"
            fill="#252525"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M9 6.78512C8.36422 6.78512 7.74272 6.97365 7.21408 7.32687C6.68545 7.68009 6.27343 8.18214 6.03013 8.76952C5.78683 9.35691 5.72317 10.0033 5.8472 10.6268C5.97124 11.2504 6.2774 11.8232 6.72696 12.2727C7.17652 12.7223 7.74931 13.0284 8.37287 13.1525C8.99643 13.2765 9.64278 13.2129 10.2302 12.9696C10.8175 12.7263 11.3196 12.3142 11.6728 11.7856C12.026 11.257 12.2146 10.6355 12.2146 9.99968C12.212 9.14791 11.8725 8.33175 11.2702 7.72945C10.6679 7.12716 9.85177 6.78766 9 6.78512ZM15.9402 9.99968C15.9386 10.3001 15.9166 10.6 15.8743 10.8974L17.8308 12.4291C17.916 12.4994 17.9734 12.5978 17.9928 12.7066C18.0122 12.8154 17.9922 12.9275 17.9365 13.023L16.0857 16.2183C16.0294 16.3128 15.9416 16.3846 15.8377 16.4208C15.7338 16.457 15.6204 16.4555 15.5175 16.4164L13.2171 15.4922C12.7381 15.861 12.2139 16.1672 11.6572 16.4031L11.3133 18.8454C11.294 18.9548 11.2374 19.0541 11.153 19.1263C11.0687 19.1986 10.9618 19.2393 10.8508 19.2416H7.14921C7.04018 19.2394 6.93509 19.2004 6.85109 19.1309C6.76709 19.0613 6.70915 18.9653 6.68672 18.8586L6.34276 16.4164C5.78458 16.1832 5.26 15.8765 4.78289 15.5046L2.48247 16.4288C2.37964 16.468 2.2663 16.4696 2.16238 16.4334C2.05847 16.3973 1.97062 16.3256 1.9143 16.2311L0.0635113 13.0362C0.007802 12.9408 -0.0121561 12.8287 0.00720345 12.7199C0.026563 12.6111 0.0839787 12.5127 0.16919 12.4424L2.12565 10.9106C2.08392 10.6087 2.06191 10.3044 2.05976 9.99968C2.06143 9.69932 2.08344 9.39941 2.12565 9.10202L0.16919 7.57028C0.0839787 7.49992 0.026563 7.40155 0.00720345 7.29275C-0.0121561 7.18396 0.007802 7.07182 0.0635113 6.97639L1.9143 3.78111C1.97056 3.68652 2.05838 3.6148 2.1623 3.57857C2.26622 3.54233 2.37959 3.54391 2.48247 3.58301L4.78289 4.5072C5.26191 4.13833 5.78612 3.83221 6.34276 3.59627L6.68672 1.15401C6.70597 1.04461 6.76261 0.945296 6.84697 0.873032C6.93133 0.800769 7.03816 0.760042 7.14921 0.757812H10.8508C10.9598 0.759935 11.0649 0.798955 11.1489 0.868505C11.2329 0.938054 11.2909 1.03402 11.3133 1.14075L11.6572 3.58301C12.2161 3.81606 12.7414 4.12268 13.2191 4.49474L15.5175 3.57056C15.6204 3.53141 15.7337 3.52978 15.8376 3.56594C15.9415 3.6021 16.0294 3.67373 16.0857 3.76825L17.9365 6.96353C17.9922 7.05896 18.0122 7.1711 17.9928 7.2799C17.9734 7.38869 17.916 7.48706 17.8308 7.55742L15.8743 9.08916C15.9161 9.39091 15.9381 9.69507 15.9402 9.99968Z"
            fill="#252525"
          />
        </svg>
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
              <span className="status-process-font-on">已付款</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">未付款</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">未付款</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">未付款</span>
            </div>
            <div className="status-process-off">
              <span className="status-process-font-off">未付款</span>
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
                {orderInfo && orderInfo.update_ts
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
