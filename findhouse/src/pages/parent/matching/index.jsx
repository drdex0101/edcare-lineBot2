import React, { useState, useEffect } from "react";
import "./matching.css";
import Pagination from "../../../components/base/pagenation";
import SettingForParent from "../../../components/base/SettingForParent";
import { useRouter } from "next/router";
import useStore from "../../../lib/store";
export default function HistoryPage() {
  const [totalCount, setTotalCount] = useState(0);
  const [matchingList, setMatchingList] = useState([]);
  const [signingList, setSigningList] = useState([]);
  const { orderId,setOrderId } = useStore();

  const fetchMatchingCount = async () => {
    const response = await fetch("/api/pair/getList?page=1&pageSize=10&status=matchByNanny");
    const data = await response.json();
    setMatchingList(data.orders || []);
  };

  const [imgUrls, setImgUrls] = useState({});
  const [imgUrlsMatching, setImgUrlsMatching] = useState({});

  // 透過 useEffect，只在 signingList 變動時才載入圖片
  useEffect(() => {
    signingList.forEach(async (avatar) => {
      if (avatar.uploadid) {
        const url = await getImgUrl(avatar.uploadid);
        setImgUrls(prev => ({ ...prev, [avatar.uploadid]: url }));
      }
      else {
        setImgUrls(prev => ({ ...prev, [avatar.uploadid]: "/nannyIcon.jpg" }));
      }
    });
  }, [signingList]);

  useEffect(() => {
    matchingList.forEach(async (avatar) => {
      if (avatar.uploadid) {
        const url = await getImgUrl(avatar.uploadid);
        setImgUrlsMatching(prev => ({ ...prev, [avatar.uploadid]: url }));
      }
      else {
        setImgUrlsMatching(prev => ({ ...prev, [avatar.uploadid]: "/nannyIcon.jpg" }));
      }
    });
  }, [matchingList]);

  const getImgUrl = async (id) => {
    const response = await fetch(`/api/base/getImgUrl?id=${id}`);
    const data = await response.json();
    console.log(data.url);
    return data.url;
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
    return `${years}歲`;
  };

  const fetchSigningCount = async () => {
    const response = await fetch("/api/pair/getList?page=1&pageSize=10&status=signing");
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
      <div className="matching-header">
        <img
          src="/icon/arrowForward.svg"
          alt="back"
          onClick={() => router.back("/parent/search")}
        />
        <SettingForParent />
      </div>

      <div className="matching-body-header-background">
        <div className="matching-body-header">
          <img src={"/icon/headIcon.svg"} alt="history-header" />
          <span className="matching-body-header-title">媒合通知</span>
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
              <div className="avatar" key={avatar.id} onClick={() => {router.push(`/parent/matching/pair/${avatar.nanny_id}`); setOrderId(avatar.order_id)}}>
                <img className="avatar-img" src={avatar.uploadid ? (imgUrlsMatching[avatar.uploadid] || "/nannyIcon.jpg") : "/nannyIcon.jpg"} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="avatar-name">{avatar.name[0] + "保母"}</span>
                  <img src="/icon/mother.png" alt="mother" style={{width: "24px", height: "24px"}}/>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="avatar-name">{avatar.nickname}</span>
                  <img src="/icon/baby.svg" alt="baby" />
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
                  趕緊配對保母吧！
                </span>
              </div>
            ) : (
              <>
                {signingList.map((avatar) => (
                  <div className="nanny-layout" key={avatar.id}  onClick={() => {router.push(`/parent/matching/signing/${avatar.nanny_id}`); setOrderId(avatar.order_id)}}>
                    <div className="nanny-avatar">
                    <img className="avatar-img" src={avatar.uploadid ? (imgUrls[avatar.uploadid] || "/nannyIcon.jpg") : "/nannyIcon.jpg"} />
                    </div>
                    <div className="nanny-intro">
                      <span className="nanny-intro-name">{avatar.name[0]}保母</span>
                    </div>
                    <div className="status">
                      <span className="status-content">小孩暱稱:{avatar.nickname}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#F3CCD4",
              width: "100%",
            }}
          >
            <Pagination totalItems={totalCount} pageSize={5} currentPage={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
