import React from "react";
import "./css/OrderHistoryItem.css"; // Ensure you have the corresponding CSS file
import { useRouter } from "next/router";
import useStore from "../../lib/store";
import { useState, useEffect } from "react";

const OrderHistoryItem = ({
  name,
  way,
  scene,
  createdTime,
  status,
  orderId,
  item,
}) => {
  const router = useRouter();
  const setItem = useStore((state) => state.setItem);
  const [careTypeData, setCareTypeData] = useState([]);
  const handleClick = () => {
    setItem(item);
    router.push(`/parent/order/details/choose`);
  };

  const fetchCareTypeData = async () => {
    try {
      let careTypeResponse;
      if (way === "suddenly") {
        careTypeResponse = await fetch(`/api/base/getSuddenly?id=${scene}`);
      } else if (way === "longTerm") {
        careTypeResponse = await fetch(`/api/base/getLongTern?id=${scene}`);
      }

      if (!careTypeResponse.ok) throw new Error("API call failed");
      const careTypeDatas = await careTypeResponse.json();

      setCareTypeData(careTypeDatas.data || {}); // ✅ 確保 `data` 是物件
    } catch (error) {
      console.error("Failed to fetch careTypeData:", error);
    }
  };

  useEffect(() => {
    fetchCareTypeData();
  }, []);

  return (
    <div className="order-history-list-item" onClick={() => handleClick()}>
      <div className="order-history-list-item-icon">
        <img src="/icon/detailsIcon.png" alt="details-icon" />
      </div>
      <div className="order-history-list-item-name-layout">
        <span className="name-font">{name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div className="wayLayout">
            <span className="normalFont">
              {way == "suddenly" ? "臨時托育" : "長期托育"}
            </span>
          </div>
          <div className="sceneLayout">
            <span className="normalFont">
              {careTypeData.scenario === "home" ? "在宅" : "到宅"}
            </span>
          </div>
        </div>
      </div>
      <div className="order-history-list-item-content">
        <span className="order-history-list-item-content-title">
          訂單編號：{orderId}
        </span>
        <span className="order-history-list-item-content-title">
          建立時間：{createdTime.slice(0, 10)}
        </span>
      </div>
      <div className="order-status-success">
        <span className="order-status-success-font">{status}</span>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
