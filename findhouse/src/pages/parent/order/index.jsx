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
