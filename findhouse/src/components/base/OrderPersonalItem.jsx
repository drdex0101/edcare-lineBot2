"use client";
import React from "react";
import "./css/OrderPersonalItem.css"; // Ensure you have the corresponding CSS file
import Link from "next/link";
import useStore from "../../lib/store";
const OrderPersonalItem = ({
  name,
  scene,
  orderNumber,
  createdTime,
  status,
  orderId,
  way,
  item,
}) => {
  const { setItem } = useStore();
  const handleUpdateShow = async () => {
    item.isShow = !item.isShow;
    console.log(item.isShow);
    const res = await fetch("/api/order/updateIsShow", {
      method: "PATCH",
      body: JSON.stringify({ id: item.id, isShow: item.isShow }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="order-layout-item">
      <div className="order-layout-item-left">
        <img
          src="/orderCreate.png"
          alt="Description of image F"
          className="order-img"
        />
        <div className="order-layout-item-left-content">
          <span className="order-layout-item-left-text">{name}</span>
          <div className="order-way-scene-layout">
            <div className="order-scene">{scene}</div>
            <div className="order-way">{way}</div>
          </div>
          <span className="order-normal-text">
            托育期間：
            <br />
            {createdTime.slice(0, 10)}~{createdTime.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="order-layout-item-right">
        <Link
          href={{
            pathname: "/parent/order/details/choose",
          }}
          onClick={() => setItem(item)}
          passHref
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="38"
            viewBox="0 0 39 38"
            fill="none"
          >
            <rect x="0.5" width="38" height="38" rx="4" fill="#F5E5E5" />
            <path
              d="M26.5231 9C25.7613 9 24.9994 9.29013 24.4179 9.87171L23.1843 11.1053L27.3949 15.3158L28.6284 14.0822C29.7905 12.9201 29.7905 11.0349 28.6284 9.87171C28.0468 9.29013 27.285 9 26.5231 9ZM21.6053 12.6842L9.5 24.7895V29H13.7106L25.8159 16.8947L21.6053 12.6842Z"
              fill="#E3838E"
            />
          </svg>
        </Link>
        {item.isShow ? (
          <div
            className="order-layout-item-right-unShow"
            onClick={handleUpdateShow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
            >
              <path
                d="M23.8209 8.181C22.9429 6.261 19.4999 0 11.9999 0C4.49987 0 1.05687 6.261 0.178871 8.181C0.0610095 8.4383 0 8.71799 0 9.001C0 9.28401 0.0610095 9.5637 0.178871 9.821C1.05687 11.739 4.49987 18 11.9999 18C19.4999 18 22.9429 11.739 23.8209 9.819C23.9385 9.56199 23.9994 9.28265 23.9994 9C23.9994 8.71735 23.9385 8.43801 23.8209 8.181ZM11.9999 15C10.8132 15 9.65315 14.6481 8.66645 13.9888C7.67976 13.3295 6.91072 12.3925 6.45659 11.2961C6.00247 10.1997 5.88365 8.99334 6.11516 7.82946C6.34667 6.66557 6.91812 5.59647 7.75723 4.75736C8.59635 3.91824 9.66544 3.3468 10.8293 3.11529C11.9932 2.88378 13.1996 3.0026 14.296 3.45672C15.3923 3.91085 16.3294 4.67988 16.9887 5.66658C17.648 6.65327 17.9999 7.81331 17.9999 9C17.9983 10.5908 17.3656 12.116 16.2408 13.2409C15.1159 14.3658 13.5907 14.9984 11.9999 15Z"
                fill="#410002"
              />
              <path
                d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                fill="#410002"
              />
            </svg>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="38"
            viewBox="0 0 39 38"
            fill="none"
            onClick={handleUpdateShow}
          >
            <rect x="0.5" width="38" height="38" rx="4" fill="#F5E5E5" />
            <path
              d="M31.3209 18.2351C30.3547 16.2781 28.9397 14.5436 27.1759 13.1543L30.2079 10.3225L28.7929 9L25.4999 12.0728C23.6772 11.0881 21.6054 10.5776 19.4999 10.5943C11.9999 10.5943 8.55687 16.4419 7.67887 18.2351C7.56101 18.4754 7.5 18.7366 7.5 19.0009C7.5 19.2653 7.56101 19.5265 7.67887 19.7668C8.64501 21.7237 10.0601 23.4583 11.8239 24.8476L8.79287 27.6794L10.2069 29L13.4999 25.9272C15.3225 26.9119 17.3944 27.4224 19.4999 27.4057C26.9999 27.4057 30.4429 21.5581 31.3209 19.7649C31.4385 19.5249 31.4994 19.264 31.4994 19C31.4994 18.736 31.4385 18.4751 31.3209 18.2351ZM13.4999 19C13.498 17.9713 13.7998 16.9621 14.3721 16.0832C14.9445 15.2043 15.7652 14.4899 16.744 14.0183C17.7229 13.5468 18.822 13.3364 19.9206 13.4104C21.0191 13.4844 22.0745 13.8398 22.9709 14.4376L21.5189 15.7937C20.9093 15.4504 20.2117 15.2674 19.4999 15.2641C18.439 15.2641 17.4216 15.6577 16.6714 16.3583C15.9213 17.0589 15.4999 18.0092 15.4999 19C15.5034 19.6648 15.6993 20.3164 16.0669 20.8857L14.6149 22.2418C13.8898 21.2965 13.4999 20.1628 13.4999 19ZM19.4999 24.6038C18.2548 24.6038 17.041 24.2396 16.0289 23.5624L17.4809 22.2063C18.0904 22.5496 18.7881 22.7326 19.4999 22.7359C20.5607 22.7359 21.5782 22.3423 22.3283 21.6417C23.0784 20.941 23.4999 19.9908 23.4999 19C23.4964 18.3352 23.3005 17.6836 22.9329 17.1143L24.3849 15.7582C25.0249 16.5953 25.4055 17.5811 25.4847 18.6071C25.5639 19.6331 25.3386 20.6596 24.8338 21.5739C24.3289 22.4881 23.5639 23.2546 22.6229 23.7891C21.6819 24.3237 20.6013 24.6056 19.4999 24.6038Z"
              fill="#E3838E"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default OrderPersonalItem;
