import React, { useState, useRef } from "react";
import "./css/Setting.css";
import { useRouter } from "next/router";

export default function SettingForParent() {
  const [isOpen, setIsOpen] = useState(false);
  const settingButtonRef = useRef(null);
  const settingPopupRef = useRef(null);
  const router = useRouter();

  const toggleSettingPopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="setting-container">
      <button
        ref={settingButtonRef}
        className="setting-button"
        onClick={toggleSettingPopup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M1.53906 3.61719C1.53906 2.51262 2.43449 1.61719 3.53906 1.61719H8.4624C9.56697 1.61719 10.4624 2.51262 10.4624 3.61719V8.54052C10.4624 9.64509 9.56697 10.5405 8.4624 10.5405H3.53906C2.43449 10.5405 1.53906 9.64509 1.53906 8.54052V3.61719Z"
            fill="#252525"
          />
          <path
            opacity="0.4"
            d="M13.4609 15.5391C13.4609 14.4345 14.3564 13.5391 15.4609 13.5391H20.3843C21.4888 13.5391 22.3843 14.4345 22.3843 15.5391V20.4624C22.3843 21.567 21.4888 22.4624 20.3843 22.4624H15.4609C14.3564 22.4624 13.4609 21.567 13.4609 20.4624V15.5391Z"
            fill="#252525"
          />
          <circle cx="17.9226" cy="6.07885" r="4.46166" fill="#252525" />
          <circle cx="6.00073" cy="18.0007" r="4.46166" fill="#252525" />
        </svg>
      </button>
      {isOpen && (
        <div ref={settingPopupRef} className="setting-popup">
          <div
            onClick={() => router.push("/parent/myAccount/member")}
            className="setting-item"
          >
            <div className="setting-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path opacity="0.4" d="M16 0H4C1.79086 0 0 1.79086 0 4V16C0 17.8642 1.27532 19.4306 3.00111 19.8743C3.32039 19.9563 3.6551 20 4 20H16C16.3449 20 16.6796 19.9563 16.9989 19.8743C18.7247 19.4306 20 17.8642 20 16V4C20 1.79086 18.2091 0 16 0Z" fill="#28303F" />
                <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 7 11)" fill="#28303F" />
                <path d="M3.99889 20H15.9989C16.3438 20 16.6785 19.9563 16.9978 19.8743C16.9307 16.0663 13.8229 13 9.99889 13C6.1749 13 3.06707 16.0663 3 19.8743C3.31929 19.9563 3.65399 20 3.99889 20Z" fill="#28303F" />
              </svg>
            </div>
            <span className="setting-item-font">
              會員資料
            </span>
          </div>
          <div
            onClick={() => router.push("/parent/matching")}
            className="setting-item"
          >
            <div className="setting-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_634_48751)">
                  <path d="M12.5325 12.7275C12.5325 13.0842 12.2883 14.1142 10.0425 15.9608C7.7775 14.1142 7.5325 13.0842 7.5325 12.7275C7.5325 12.16 7.90667 11.6983 8.36583 11.6983C8.825 11.6983 9.19917 12.16 9.19917 12.7275C9.19917 13.1875 9.5725 13.5608 10.0325 13.5608C10.4925 13.5608 10.8658 13.1875 10.8658 12.7275C10.8658 12.16 11.24 11.6983 11.6992 11.6983C12.1583 11.6983 12.5325 12.16 12.5325 12.7275ZM19.1675 9.16667V15.8333C19.165 18.1333 17.3008 19.9975 15.0008 20H5C2.7 19.9975 0.835833 18.1333 0.833333 15.8333V9.16667C0.833333 8.70667 1.20667 8.33333 1.66667 8.33333H18.3333C18.7933 8.33333 19.1675 8.70667 19.1675 9.16667ZM14.1992 12.7275C14.1992 11.2408 13.0775 10.0317 11.6992 10.0317C11.0592 10.0317 10.475 10.2917 10.0325 10.72C9.59 10.2925 9.00583 10.0317 8.36583 10.0317C6.9875 10.0317 5.86583 11.2408 5.86583 12.7275C5.86583 14.0592 6.8875 15.5392 8.98917 17.2525C9.29167 17.4992 9.6625 17.6225 10.0325 17.6225C10.4025 17.6225 10.7733 17.4992 11.0758 17.2525C13.1775 15.5392 14.1992 14.0592 14.1992 12.7275ZM16.015 0.00416667C15.9542 0.00166667 4.16667 0 4.16667 0C1.865 0 0 1.865 0 4.16667C0 5.54667 1.11917 6.66667 2.5 6.66667H17.5008C18.8167 6.6825 19.9158 5.66583 20.0008 4.3525C20.1008 2.05083 18.3167 0.104167 16.015 0.00416667Z" fill="#FFB3B3" />
                </g>
                <defs>
                  <clipPath id="clip0_634_48751">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="setting-item-font">
              媒合訂單
            </span>
          </div>
          <div
            onClick={() => router.push("/parent/favorite")}
            className="setting-item"
          >
            <div className="setting-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                <path d="M11.5 4.50475C9.27778 -0.71129 1.5 -0.155735 1.5 6.51097C1.5 13.1777 11.5 18.7334 11.5 18.7334C11.5 18.7334 21.5 13.1777 21.5 6.51097C21.5 -0.155735 13.7222 -0.71129 11.5 4.50475Z" fill="#E3838E" stroke="#E3838E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span className="setting-item-font">
              收藏案件
            </span>
          </div>
          <div
            onClick={() => router.push("/parent/history")}
            className="setting-item"
          >
            <div className="setting-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.327 0.826998C0.5 1.65398 0.5 2.98501 0.5 5.64706V18.3529C0.5 21.015 0.5 22.346 1.327 23.173C2.15398 24 3.48501 24 6.14706 24H14.6176C17.2797 24 18.6107 24 19.4377 23.173C20.2647 22.346 20.2647 21.015 20.2647 18.3529V5.64706C20.2647 2.98501 20.2647 1.65398 19.4377 0.826998C18.6107 2.52443e-07 17.2797 0 14.6176 0H6.14706C3.48501 0 2.15398 2.52443e-07 1.327 0.826998ZM6.14706 5.64706C5.36737 5.64706 4.73529 6.27913 4.73529 7.05882C4.73529 7.83851 5.36737 8.47059 6.14706 8.47059H14.6176C15.3974 8.47059 16.0294 7.83851 16.0294 7.05882C16.0294 6.27913 15.3974 5.64706 14.6176 5.64706H6.14706ZM6.14706 11.2941C5.36737 11.2941 4.73529 11.9262 4.73529 12.7059C4.73529 13.4856 5.36737 14.1176 6.14706 14.1176H14.6176C15.3974 14.1176 16.0294 13.4856 16.0294 12.7059C16.0294 11.9262 15.3974 11.2941 14.6176 11.2941H6.14706ZM6.14706 16.9412C5.36737 16.9412 4.73529 17.5732 4.73529 18.3529C4.73529 19.1327 5.36737 19.7647 6.14706 19.7647H11.7941C12.5738 19.7647 13.2059 19.1327 13.2059 18.3529C13.2059 17.5732 12.5738 16.9412 11.7941 16.9412H6.14706Z" fill="#402626" />
              </svg>
            </div>
            <span className="setting-item-font">
              歷史訂單
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
