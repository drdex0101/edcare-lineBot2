"use client";
import React from 'react';
import './css/OrderPersonalItem.css'; // Ensure you have the corresponding CSS file
import Link from 'next/link';
import useStore from '../../lib/store';
import { useEffect } from 'react';
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

  return (
    <div className="order-layout-item">
        <div className="order-layout-item-left">
            <img src="/orderCreate.png" alt="Description of image F" className="order-img"/>
            <div className='order-layout-item-left-content'>
                <span className="order-layout-item-left-text">{name}</span>
                <div className="order-way-scene-layout">
                    <div className="order-scene">{scene}</div>
                    <div className="order-way">{way}</div>
                </div>
                <span className="order-normal-text">托育期間：<br/>
                {createdTime.slice(0, 10)}~{createdTime.slice(0, 10)}</span>
            </div>
        </div>
        <div className="order-layout-item-right">
          <Link
            href={{
              pathname: '/parent/create/choose'
            }}
            onClick={() => setItem(item)} 
            passHref
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38" fill="none">
              <rect x="0.5" width="38" height="38" rx="4" fill="#F5E5E5"/>
              <path d="M26.5231 9C25.7613 9 24.9994 9.29013 24.4179 9.87171L23.1843 11.1053L27.3949 15.3158L28.6284 14.0822C29.7905 12.9201 29.7905 11.0349 28.6284 9.87171C28.0468 9.29013 27.285 9 26.5231 9ZM21.6053 12.6842L9.5 24.7895V29H13.7106L25.8159 16.8947L21.6053 12.6842Z" fill="#E3838E"/>
            </svg>
          </Link>
         
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38" fill="none">
            <rect x="0.5" width="38" height="38" rx="4" fill="#F5E5E5"/>
            <path d="M31.3209 18.2351C30.3547 16.2781 28.9397 14.5436 27.1759 13.1543L30.2079 10.3225L28.7929 9L25.4999 12.0728C23.6772 11.0881 21.6054 10.5776 19.4999 10.5943C11.9999 10.5943 8.55687 16.4419 7.67887 18.2351C7.56101 18.4754 7.5 18.7366 7.5 19.0009C7.5 19.2653 7.56101 19.5265 7.67887 19.7668C8.64501 21.7237 10.0601 23.4583 11.8239 24.8476L8.79287 27.6794L10.2069 29L13.4999 25.9272C15.3225 26.9119 17.3944 27.4224 19.4999 27.4057C26.9999 27.4057 30.4429 21.5581 31.3209 19.7649C31.4385 19.5249 31.4994 19.264 31.4994 19C31.4994 18.736 31.4385 18.4751 31.3209 18.2351ZM13.4999 19C13.498 17.9713 13.7998 16.9621 14.3721 16.0832C14.9445 15.2043 15.7652 14.4899 16.744 14.0183C17.7229 13.5468 18.822 13.3364 19.9206 13.4104C21.0191 13.4844 22.0745 13.8398 22.9709 14.4376L21.5189 15.7937C20.9093 15.4504 20.2117 15.2674 19.4999 15.2641C18.439 15.2641 17.4216 15.6577 16.6714 16.3583C15.9213 17.0589 15.4999 18.0092 15.4999 19C15.5034 19.6648 15.6993 20.3164 16.0669 20.8857L14.6149 22.2418C13.8898 21.2965 13.4999 20.1628 13.4999 19ZM19.4999 24.6038C18.2548 24.6038 17.041 24.2396 16.0289 23.5624L17.4809 22.2063C18.0904 22.5496 18.7881 22.7326 19.4999 22.7359C20.5607 22.7359 21.5782 22.3423 22.3283 21.6417C23.0784 20.941 23.4999 19.9908 23.4999 19C23.4964 18.3352 23.3005 17.6836 22.9329 17.1143L24.3849 15.7582C25.0249 16.5953 25.4055 17.5811 25.4847 18.6071C25.5639 19.6331 25.3386 20.6596 24.8338 21.5739C24.3289 22.4881 23.5639 23.2546 22.6229 23.7891C21.6819 24.3237 20.6013 24.6056 19.4999 24.6038Z" fill="#E3838E"/>
            </svg>
        </div>
    </div>
  );
};

export default OrderPersonalItem;
