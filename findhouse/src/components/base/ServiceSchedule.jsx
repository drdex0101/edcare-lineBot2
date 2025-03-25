import React, { useState, useEffect } from "react";
import "./css/ServiceSchedule.css"; // 引入樣式文件

export default function ServiceSchedule({ weekdays, care_time }) {
  const [activeDays, setActiveDays] = useState([]);
  const [activeSlots, setActiveSlots] = useState([]);

  const dayMapping = ["", "日", "一", "二", "三", "四", "五", "六"];
  const timeLabels = ["6:00", "中午", "18:00", "24:00"];

  useEffect(() => {
    // 設置激活的天
    const activeDayIndices = weekdays?.map((day) => parseInt(day, 10));
    setActiveDays(activeDayIndices);

    // 設置激活的時段
    let newActiveSlots = [];
    if (care_time === "allDay") {
      activeDayIndices.forEach((day) => {
        [0, 1, 2, 3].forEach((row) => {
          newActiveSlots.push(row * 7 + day-1);
        });
      });
    }
    if (care_time === "night") {
      activeDayIndices.forEach((day) => {
        [2, 3].forEach((row) => {
          newActiveSlots.push(row * 7 + day-1);
        });
      });
    }
    if (care_time === "morning") {
      activeDayIndices.forEach((day) => {
        [0, 1, 2].forEach((row) => {
          newActiveSlots.push(row * 7 + day-1);
        });
      });
    }

    setActiveSlots(newActiveSlots);
  }, [weekdays, care_time]);

  return (
    <div className="service-schedule">
      <span className="header1">服務時段</span>
      <div className="schedule-container">
        <div className="days">
          {dayMapping.map((day, index) => (
            <div
              key={index}
              className={`day ${activeDays?.includes(index) ? "active" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="time-slots">
          {timeLabels.map((label, rowIndex) => (
            <React.Fragment key={label}>
              <div className="time-label" disable>{label}</div>
              <div className="slots" disable>
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
                      ></div>
                    );
                  })}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
