import React, { useState, useEffect } from "react";
import "./myAccount.css";
import Pagination from "../../../components/base/pagenation";
import OrderHistoryItem from "../../../components/base/OrderHistoryItem";
import { useRouter } from "next/router";
import Loading from "../../../components/base/Loading";
import SettingForNanny from "../../../components/base/SettingForNanny";
export default function DetailsPage() {
  const router = useRouter();
  const [historyList, setHistoryList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [matchingList, setMatchingList] = useState([]);
  const [matchingCount, setMatchingCount] = useState(0);

  const fetchHistoryList = async () => {
    setIsLoading(true);
    const response = await fetch("/api/order/getHistoryList?page=1&pageSize=4");
    const data = await response.json();
    setHistoryList(data.orders);
    setTotalCount(data.totalCount);
    setIsLoading(false);
  };

  const fetchFavoriteList = async () => {
    const response = await fetch("/api/favorite/getFavoriteList?page=1&pageSize=4");
    const data = await response.json();
    setFavoriteList(data.favorite);
    setFavoriteCount(data.favorite.length);
    setIsLoading(false);
  };

  const fetchMatchingList = async () => {
    const response = await fetch("/api/matching/getMatchingList?page=1&pageSize=4");
    const data = await response.json();
    setMatchingList(data.matchings);
    setMatchingCount(data.matchings.length);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistoryList();
    fetchFavoriteList();
    fetchMatchingList();
  }, []);  

  return (
    <div className="details-main">
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
      <>
        <div className="details-header">
          <img
            src="/icon/arrowForward.svg"
            alt="back"
            onClick={() => router.back()}
          />
          <SettingForNanny />
        </div>
        <div className="details-body">
          <img src={"/icon/detailsIcon.png"} alt="details-icon" />
          <div className="details-four-layout">
            <div className="details-four-layout-item">
              <div className="details-four-layout-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <circle
                    cx="15"
                    cy="15"
                    r="15"
                    fill="#14BDBD"
                    fill-opacity="0.25"
                  />
                  <path
                    d="M11.6637 19.8949L8.0146 16.0678C7.60798 15.6414 6.96157 15.6414 6.55496 16.0678C6.14835 16.4943 6.14835 17.1722 6.55496 17.5987L10.9234 22.1802C11.3301 22.6066 11.9869 22.6066 12.3935 22.1802L23.445 10.6006C23.8517 10.1742 23.8517 9.49627 23.445 9.06983C23.0384 8.64339 22.392 8.64339 21.9854 9.06983L11.6637 19.8949Z"
                    fill="#14BDBD"
                  />
                </svg>
              </div>
              <div className="details-four-layout-item-coulumn">
                <span className="details-four-layout-item-title">身分驗證</span>
                <span className="details-four-layout-item-content">已驗證</span>
              </div>
            </div>
            <div className="details-four-layout-item">
              <div className="details-four-layout-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <g clip-path="url(#clip0_132_21989)">
                    <path
                      d="M18.7987 19.0912C18.7987 19.6262 18.4325 21.1712 15.0637 23.9412C11.6662 21.1712 11.2987 19.6262 11.2987 19.0912C11.2987 18.24 11.86 17.5475 12.5487 17.5475C13.2375 17.5475 13.7987 18.24 13.7987 19.0912C13.7987 19.7812 14.3587 20.3413 15.0487 20.3413C15.7387 20.3413 16.2987 19.7812 16.2987 19.0912C16.2987 18.24 16.86 17.5475 17.5487 17.5475C18.2375 17.5475 18.7987 18.24 18.7987 19.0912ZM28.7512 13.75V23.75C28.7475 27.2 25.9513 29.9963 22.5012 30H7.5C4.05 29.9963 1.25375 27.2 1.25 23.75V13.75C1.25 13.06 1.81 12.5 2.5 12.5H27.5C28.19 12.5 28.7512 13.06 28.7512 13.75ZM21.2987 19.0912C21.2987 16.8612 19.6162 15.0475 17.5487 15.0475C16.5887 15.0475 15.7125 15.4375 15.0487 16.08C14.385 15.4388 13.5087 15.0475 12.5487 15.0475C10.4812 15.0475 8.79875 16.8612 8.79875 19.0912C8.79875 21.0887 10.3312 23.3087 13.4837 25.8787C13.9375 26.2487 14.4937 26.4338 15.0487 26.4338C15.6037 26.4338 16.16 26.2487 16.6138 25.8787C19.7663 23.3087 21.2987 21.0887 21.2987 19.0912ZM24.0225 0.00625C23.9312 0.0025 6.25 0 6.25 0C2.7975 0 0 2.7975 0 6.25C0 8.32 1.67875 10 3.75 10H26.2512C28.225 10.0238 29.8737 8.49875 30.0012 6.52875C30.1512 3.07625 27.475 0.15625 24.0225 0.00625Z"
                      fill="#FFB3B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_132_21989">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div
                className="details-four-layout-item-coulumn"
                onClick={() => router.push("/nanny/matching")}
              >
                <span className="details-four-layout-item-title">媒合訂單</span>
                <span className="details-four-layout-item-content">{matchingCount}</span>
              </div>
            </div>
          </div>
          <div className="details-four-layout">
            <div className="details-four-layout-item">
              <div className="details-four-layout-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="24"
                  viewBox="0 0 26 24"
                  fill="none"
                >
                  <path
                    d="M13 5.56508C10.3333 -0.694174 1 -0.0275066 1 7.97253C1 15.9726 13 22.6395 13 22.6395C13 22.6395 25 15.9726 25 7.97253C25 -0.0275066 15.6667 -0.694174 13 5.56508Z"
                    fill="#E3838E"
                    stroke="#E3838E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                className="details-four-layout-item-coulumn"
                onClick={() => router.push("/nanny/favorite")}
              >
                <span className="details-four-layout-item-title">收藏案件</span>
                <span className="details-four-layout-item-content">{favoriteCount}</span>
              </div>
            </div>
            <div className="details-four-layout-item">
              <div className="details-four-layout-item-icon">
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
              </div>
              <div
                className="details-four-layout-item-coulumn"
                onClick={() => router.push("/nanny/history")}
              >
                <span className="details-four-layout-item-title">歷史訂單</span>
                <span className="details-four-layout-item-content">
                  {totalCount}
                </span>
              </div>
            </div>
          </div>
          <div className="order-history-list">
            {historyList && historyList.length > 0 ? (
              historyList.map((item, index) => (
                <OrderHistoryItem
                  key={index}
                  name={item.nickname}
                  way={item.way}
                  scene={item.scenario}
                  orderId={item.id}
                  createdTime={item.created_ts}
                  status={item.status}
                  item={item}
                />
              ))
            ) : (
              <>
                <div className="no-order-history">
                  <img
                    src={"/orderCreate.png"}
                    alt="no-order-history"
                    className="no-order-history-img"
                  />
                  <span className="no-order-history-font">尚無訂單資料</span>
                </div>
              </>
            )}
            <Pagination totalItems={totalCount} pageSize={4} />
          </div>
        </div>
      </>
    </div>
  );
}
