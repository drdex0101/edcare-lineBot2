import React, { useState, useEffect } from "react";
import "./order.css";
import SearchBarSortOnly from "../../../components/base/SearchBarSortOnly";
import OrderPersonalItem from "../../../components/base/OrderPersonalItem";
import Pagination from "../../../components/base/pagenation";
import { useRouter } from "next/router";
import SettingForParent from "../../../components/base/SettingForParent";
export default function OrderPage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedSort, setSelectedSort] = useState(null);
  const getOrderList = async () => {
    const response = await fetch(
      `/api/order/getOrderInfoList?page=1&pageSize=4&sort=${selectedSort}&keyword=${keywords}`,
    );
    const data = await response.json();
    setOrderList(data.orders);
    setTotalCount(data.totalCount);
  };
  useEffect(() => {
    getOrderList();
  }, [keywords]);

  const handleFilterChange = (sorts) => {
    setSelectedSort(sorts);
    getOrderList(); // Fetch nanny info with updated filters
  };

  const handleToCreate = async () => {
    router.push("/parent/create");
  };

  return (
    <div className="order-main">
      <div className="order-header">
        <img
          src="/icon/arrowForward.svg"
          alt="back"
          onClick={() => router.back()}
        />
        <SettingForParent />
      </div>
      <div className="order-body-header" onClick={handleToCreate}>
        <div className="order-body-header-left">
          <span className="left-font">建立托育資料</span>
        </div>
        <div className="order-body-header-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="39"
            viewBox="0 0 38 39"
            fill="none"
          >
            <rect y="0.5" width="38" height="38" rx="4" fill="#F2F2F2" />
            <path
              d="M26.0231 9.5C25.2613 9.5 24.4994 9.79013 23.9179 10.3717L22.6843 11.6053L26.8949 15.8158L28.1284 14.5822C29.2905 13.4201 29.2905 11.5349 28.1284 10.3717C27.5468 9.79013 26.785 9.5 26.0231 9.5ZM21.1053 13.1842L9 25.2895V29.5H13.2106L25.3159 17.3947L21.1053 13.1842Z"
              fill="#CCCCCC"
            />
          </svg>
        <div style={{display: "flex", alignItems: "center",backgroundColor: "#F2F2F2",borderRadius: "4px"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="19"
            viewBox="0 0 24 19"
            fill="none"
          >
            <path
              d="M23.8209 8.681C22.9429 6.761 19.4999 0.5 11.9999 0.5C4.49987 0.5 1.05687 6.761 0.178871 8.681C0.0610095 8.9383 0 9.21799 0 9.501C0 9.78401 0.0610095 10.0637 0.178871 10.321C1.05687 12.239 4.49987 18.5 11.9999 18.5C19.4999 18.5 22.9429 12.239 23.8209 10.319C23.9385 10.062 23.9994 9.78265 23.9994 9.5C23.9994 9.21735 23.9385 8.93801 23.8209 8.681ZM11.9999 15.5C10.8132 15.5 9.65315 15.1481 8.66645 14.4888C7.67976 13.8295 6.91072 12.8925 6.45659 11.7961C6.00247 10.6997 5.88365 9.49334 6.11516 8.32946C6.34667 7.16557 6.91812 6.09647 7.75723 5.25736C8.59635 4.41824 9.66544 3.8468 10.8293 3.61529C11.9932 3.38378 13.1996 3.5026 14.296 3.95672C15.3923 4.41085 16.3294 5.17988 16.9887 6.16658C17.648 7.15327 17.9999 8.31331 17.9999 9.5C17.9983 11.0908 17.3656 12.616 16.2408 13.7409C15.1159 14.8658 13.5907 15.4984 11.9999 15.5Z"
              fill="#CCCCCC"
            />
            <path
              d="M12 13.5C14.2091 13.5 16 11.7091 16 9.5C16 7.29086 14.2091 5.5 12 5.5C9.79086 5.5 8 7.29086 8 9.5C8 11.7091 9.79086 13.5 12 13.5Z"
              fill="#CCCCCC"
            />
          </svg>
          </div>
        </div>
      </div>

      <div className="order-search-layout">
        <div className="search-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3V3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
              fill="#999999"
            />
          </svg>
          <input
            style={{ border: "none" }}
            placeholder="搜尋暱稱"
            value={keywords || ""}
            onChange={(e) => setKeywords(e.target.value)}
          ></input>
        </div>
        <SearchBarSortOnly onChange={handleFilterChange} />
      </div>
      <div className="order-layout">
        <div className="order-history-list">
          {orderList && orderList.length > 0 ? (
            orderList.map((item, index) => (
              <OrderPersonalItem
                key={index}
                name={item.nickname}
                way={item.choosetype}
                scene={
                  item.choosetype === "suddenly"
                    ? item.suddenly_scenario
                    : item.long_term_scenario
                }
                orderId={item.id}
                createdTime={item.created_ts}
                item={item}
              />
            ))
          ) : (
            <>
              <div className="no-order">
                <img
                  src={"/orderCreate.png"}
                  alt="no-order"
                  className="no-order-img"
                />
                <span className="no-order-font">
                  尚無資料
                  <br />
                  趕緊建立托育資料吧！
                </span>
              </div>
            </>
          )}
          <Pagination totalItems={totalCount} pageSize={4} />
        </div>
      </div>
    </div>
  );
}
