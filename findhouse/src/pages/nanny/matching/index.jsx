import React, { useState, useEffect } from "react";
import "./matching.css";
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
    const response = await fetch("/api/pair/getListForNanny?page=1&pageSize=50&status=matchByParent");
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
    const response = await fetch("/api/pair/getListForNanny?page=1&pageSize=50&status=signing");
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
                  <img src="/icon/baby.svg" alt="baby" />
                  <span className="avatar-name">{avatar.nickname}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="matching-body-layoff-content-background">
          <div className="matching-body-layoff-content">
            <span className="matching-body-layoff-content-title">
              已配對，待中心聯繫...
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
                  <div className="nanny-layout" key={avatar.id} onClick={() => {router.push(`/nanny/matching/signing/${avatar.order_id}`); setOrderId(avatar.order_id)}}>
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
