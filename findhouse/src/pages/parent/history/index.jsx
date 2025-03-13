import React, { useState, useEffect } from "react";
import "./history.css";
import Pagination from "../../../components/base/pagenation";
import SearchBarSortOnly from "../../../components/base/SearchBarSortOnly";
import OrderHistoryItem from "../../../components/base/OrderHistoryItem";
import SettingForParent from "../../../components/base/SettingForParent";
import { useRouter } from "next/router";
export default function HistoryPage() {
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [historyList, setHistoryList] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const router = useRouter();
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (sorts) => {
    setSelectedSort(sorts);
    fetchHistoryList(); // Fetch nanny info with updated filters
  };

  const fetchHistoryList = async () => {
    try {
      const response = await fetch(
        `/api/order/getHistoryList?page=${page}&pageSize=10&keyword=${keywords}&sort=${selectedSort}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data.totalCount);
      setHistoryList(data.orders);
    } catch (error) {
      console.error("Failed to fetch history list:", error);
    }
  };

  const handleClick = (orderId) => {
    router.push(`/parent/history/${orderId}`);
  };

  useEffect(() => {
    fetchHistoryList();
  }, [page, keywords]);

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

      <div className="history-search-layout">
        <div className="history-search-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
              fill="#999999"
            />
          </svg>
          <input
            style={{ border: "none" }}
            placeholder="搜尋暱稱"
            value={keywords || null}
            onChange={(e) => setKeywords(e.target.value)}
          ></input>
        </div>
        <SearchBarSortOnly
          keyword={keywords} // 將關鍵字傳遞給子組件
          setKeyword={setKeywords} // 傳遞更新函數
          onChange={handleFilterChange} // 傳遞選擇變更的處理函數
        />
      </div>

      <div className="history-body-content">
        {historyList.map((item) => (
          <div key={item.id}>
            <OrderHistoryItem
              name={item.nickname}
              way={item.choosetype}
              scene={item.scenario}
              orderId={item.id}
              createdTime={item.created_ts}
              status={item.status}
              handleClick={handleClick}
            />
          </div>
        ))}

        {total > 0 && (
          <Pagination
            page={page}
            totalItems={total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
