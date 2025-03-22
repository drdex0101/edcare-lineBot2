import React, { useState, useEffect } from "react";
import "../myAccount.css";
import { useRouter } from "next/router";
import SettingForNanny from "../../../../components/base/SettingForNanny";
export default function ProfilePage() {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useState([]);

  const fetchMemberInfo = async () => {
    const response = await fetch("/api/member/getMemberInfo");
    const data = await response.json();
    setMemberInfo(data.member[0]);
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  return (
    <div className="details-main">
      <div className="details-header">
        <img
          src="/icon/arrowForward.svg"
          alt="back"
          onClick={() => router.back()}
        />
        <SettingForNanny />
      </div>
      <div className="member-body-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M24 0H6C2.68629 0 0 2.68629 0 6V24C0 26.7964 1.91298 29.1459 4.50166 29.8114C4.98059 29.9345 5.48265 30 6 30H24C24.5174 30 25.0194 29.9345 25.4983 29.8114C28.087 29.1459 30 26.7964 30 24V6C30 2.68629 27.3137 0 24 0Z"
            fill="#28303F"
          />
          <circle
            cx="4.5"
            cy="4.5"
            r="4.5"
            transform="matrix(1 0 0 -1 10.5 16.5)"
            fill="#28303F"
          />
          <path
            d="M5.99834 30H23.9983C24.5157 30 25.0178 29.9345 25.4967 29.8114C25.3961 24.0994 20.7343 19.5 14.9983 19.5C9.26235 19.5 4.60061 24.0994 4.5 29.8114C4.97893 29.9345 5.48099 30 5.99834 30Z"
            fill="#28303F"
          />
        </svg>
        <span className="member-body-header-title">個人資料</span>
      </div>
      <div className="member-body">
        <div className="member-header">
          <div className="member-header-img">
            <img src="/icon/detailsIcon.png" alt="details-icon" />
          </div>
          <span className="member-header-title">個人資料</span>
        </div>
        <div className="member-body-content">
          <span className="member-body-content-font">
            會員編號： 
            {memberInfo.job === '保母' 
              ? `N000${memberInfo.id}` 
              : `P000${memberInfo.id}`}
          </span>
          <span className="member-body-content-font">
            會員姓名： {memberInfo.name}
          </span>
          <span className="member-body-content-font">
            聯繫電話：{memberInfo.cellphone}
          </span>
          <span className="member-body-content-font">
            聯繫信箱：{memberInfo.email}
          </span>
        </div>
      </div>
    </div>
  );
}
