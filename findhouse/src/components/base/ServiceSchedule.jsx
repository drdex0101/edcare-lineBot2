import React, { useState } from "react";
import "./css/ServiceSchedule.css"; // 引入樣式文件
export default function ServiceSchedule() {
  const [activeSlots, setActiveSlots] = useState([]);

  const toggleSlot = (index) => {
    setActiveSlots((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="service-schedule">
      <div className="header">服務時段</div>
      <div className="schedule-container">
        <div className="days">
          {["","日", "一", "二", "三", "四", "五", "六"].map((day) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
        </div>
        <div className="time-slots">
          {["6:00", "中午", "18:00","24:00"].map((label, rowIndex) => (
            <>
              <div key={label} className="time-label">
                {label}
              </div>
              <div className="slots">
                {Array(7)
                  .fill(0)
                  .map((_, colIndex) => {
                    const index = rowIndex * 7 + colIndex;
                    return (
                      <div
                        key={index}
                        className={`slot ${
                          activeSlots.includes(index) ? "active" : ""
                        }`}
                        onClick={() => toggleSlot(index)}
                      ></div>
                    );
                  })}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}