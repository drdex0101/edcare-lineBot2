import React, { useState, useEffect } from "react";
import "./matching.css";
import Pagination from "../../../components/base/pagenation";
import Loading from "../../../components/base/Loading";
import SettingForNanny from "../../../components/base/SettingForNanny";
import { useRouter } from "next/router";
import useStore from "../../../lib/store";
export default function HistoryPage() {
  const [totalCount, setTotalCount] = useState(0);
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchingList, setMatchingList] = useState([]);
  const [signingList, setSigningList] = useState([]);
  const { orderId, setOrderId } = useStore();

  const fetchMatchingCount = async () => {
    const response = await fetch("/api/pair/getList?page=1&pageSize=50&status=matchByParent");
    const data = await response.json();
    setMatchingList(data.orders || []);
  };

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }
  
    if (months === 0 && today.getDate() < birthDate.getDate()) {
      months = 11;
      years--;
    }
    if (years === 0) {
      return `${years}歲${months}個月`;
    } else if (months === 0) {
      return `${years}歲`;
    } else {
      return `${years}歲${months}個月`;
    }
  };

  const fetchSigningCount = async () => {
    const response = await fetch("/api/pair/getList?page=1&pageSize=50&status=signing");
    const data = await response.json();
    setSigningList(data.orders || []);
    setTotalCount(data.totalCount || 0);
  };
  const router = useRouter();

  useEffect(() => {
    fetchMatchingCount();
    fetchSigningCount();
  }, []);

  return (
    <div className="matching-main">
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
      <div className="matching-header">
        <img
          src="/icon/arrowForward.svg"
          alt="back"
          onClick={() => router.back()}
        />
        <SettingForNanny />
      </div>
      <div className="matching-body-header-background">
        <div className="matching-body-header">
          <img src={"/icon/headIcon.svg"} alt="history-header" />
          <p className="matching-body-header-title">媒合通知</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#F3CCD4",
          borderRadius: "40px 0 0px 0",
          width: "100%",
          border: "none",
        }}
      >
        <div className="matching-body-layoff">
          <span className="matching-body-layoff-title">新配對</span>
          <div className="avatar-container">
            {matchingList.map((avatar) => (
              <div className="avatar" key={avatar.id}>
                <img src={"/orderCreate.png"} alt="avatar" className="avatar-img" onClick={() => { router.push(`/nanny/matching/pair/${avatar.order_id}`); setOrderId(avatar.nanny_id)}} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="avatar-name">{avatar.nickname}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                  >
                    <path
                      d="M2.05313 5.15243H6.26773C6.27104 5.16807 6.27439 5.18369 6.27778 5.1993C6.29145 5.26223 6.30581 5.32523 6.32083 5.38827H3.34287C2.74509 5.38827 2.27052 5.88025 2.27052 6.47464C2.27052 7.06903 2.74509 7.56101 3.34287 7.56101H7.05359C7.087 7.6403 7.12077 7.71895 7.1548 7.79685H4.63262C4.03483 7.79685 3.56026 8.28883 3.56026 8.88322C3.56026 9.47761 4.03483 9.96959 4.63262 9.96959H8.2429C8.29443 10.0614 8.34424 10.1489 8.39192 10.2316C8.5502 10.5064 8.68564 10.7302 8.78353 10.8885L8.77928 10.8914L8.9476 11.1485L8.94797 11.149L8.95023 11.1525L8.95047 11.1529L8.95133 11.1542L8.95161 11.1546L9.12455 11.4188L9.25342 11.6156L9.47973 11.5513L9.77996 11.466L9.78013 11.466L9.78037 11.4659L9.78186 11.4655L9.78238 11.4653L9.78631 11.4642L9.78699 11.464L10.0849 11.3794L10.0834 11.3742C10.2587 11.3193 10.5029 11.2402 10.7959 11.1381C11.4026 10.9267 12.2256 10.6148 13.0841 10.2137C13.9388 9.81427 14.851 9.31619 15.6239 8.72688C16.3842 8.14725 17.0861 7.42213 17.4057 6.54461C17.7238 5.6714 17.6884 4.70544 17.307 3.85864C16.9257 3.01195 16.2291 2.35234 15.3685 2.0268C14.7538 1.79291 14.0862 1.74194 13.4439 1.88003C13.1953 1.93349 12.9545 2.01441 12.7256 2.12056C12.569 1.76478 12.3541 1.43525 12.0872 1.14712C11.545 0.561703 10.8209 0.182691 10.0356 0.0748638C9.2503 -0.0329701 8.45283 0.137176 7.77675 0.556055C7.10198 0.974133 6.58948 1.61429 6.32323 2.36881C6.25143 2.56679 6.19949 2.77131 6.1643 2.97969H2.05313C1.45534 2.97969 0.980776 3.47167 0.980776 4.06606C0.980776 4.66045 1.45534 5.15243 2.05313 5.15243Z"
                      fill="url(#paint0_linear_427_32992)"
                      stroke="white"
                      stroke-width="0.640011"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_427_32992"
                        x1="1.7307"
                        y1="3.84711"
                        x2="14.0321"
                        y2="8.08445"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E5941E" />
                        <stop offset="0.786533" stop-color="#F1C467" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="matching-body-layoff-content-background">
          <div className="matching-body-layoff-content">
            <span className="matching-body-layoff-content-title">
              已配對，待社工聯繫...
            </span>
            {totalCount === 0 ? (
              <div className="space-layout">
                <img
                  src="/icon/spaceIcon.png"
                  className="space-icon"
                  alt="space icon"
                />
                <span className="matching-body-layoff-content-title">
                  尚無資料
                  <br />
                  趕緊配對家長吧！
                </span>
              </div>
            ) : (
              <>
                {signingList.map((avatar) => (
                  <div className="nanny-layout" key={avatar.id}>
                    <div className="nanny-avatar">
                      <img
                        src={"/orderCreate.png"}
                        className="avatar-img"
                        alt="nanny avatar"
                      />
                    </div>
                    <div className="nanny-intro">
                      <span className="nanny-intro-name">{avatar.nickname}</span>
                      <span className="nanny-intro-exp">{calculateAge(avatar.birthday)}</span>
                    </div>
                    <div className="status">
                      <span className="status-content">已配對</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
