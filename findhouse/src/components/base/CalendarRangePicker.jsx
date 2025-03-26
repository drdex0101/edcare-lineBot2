import React, { useState, useEffect } from "react";

const DAYS_OF_WEEK = ["日", "一", "二", "三", "四", "五", "六"];

export default function CustomCalendar({ startDate, endDate }) {
  const parsedStartDate = startDate ? new Date(startDate) : null;
  const parsedEndDate = endDate ? new Date(endDate) : null;
  const [currentDate, setCurrentDate] = useState(parsedStartDate || new Date());
  const [highlightedDates, setHighlightedDates] = useState([]); // 初始化為空陣列
  // 計算當月的所有天數
  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay(); // 月份第一天是星期幾
    const totalDays = new Date(year, month + 1, 0).getDate(); // 當月總天數

    // 前置空白（非當月日期）
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 當月日期
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    // 當月日期
    for (let i = totalDays; i <= 35; i++) {
      days.push(null);
    }

    return days;
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  useEffect(() => {
    // 只有當日期真的改變時才更新 highlightedDates
    if (parsedStartDate instanceof Date && parsedEndDate instanceof Date) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const startTime = new Date(currentYear, currentMonth, 1);
      const endTime = new Date(currentYear, currentMonth + 1, 0);

      // 如果日期範圍與當前月份有重疊才進行更新
      if (parsedStartDate <= endTime && parsedEndDate >= startTime) {
        const rangeStart = new Date(
          Math.max(parsedStartDate.getTime(), startTime.getTime()),
        );
        const rangeEnd = new Date(
          Math.min(parsedEndDate.getTime(), endTime.getTime()),
        );

        const range = [];
        const startDay = rangeStart.getDate();
        const endDay = rangeEnd.getDate();

        for (let i = startDay; i <= endDay; i++) {
          range.push(i);
        }

        // 比較新舊值，只有在真正需要更新時才設置新的狀態
        if (JSON.stringify(range) !== JSON.stringify(highlightedDates)) {
          setHighlightedDates(range);
        }
      } else if (highlightedDates.length > 0) {
        setHighlightedDates([]);
      }
    } else if (highlightedDates.length > 0) {
      setHighlightedDates([]);
    }
  }, [parsedStartDate, parsedEndDate, currentDate, highlightedDates]);

  // 切換月份
  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1,
    );
    setCurrentDate(newDate);
  };

  return (
    <div style={styles.container}>
      {/* 月份切換 */}
      <div style={styles.header}>
        <button style={styles.navButton} onClick={() => handleMonthChange(-1)}>
          &lt;
        </button>
        <span style={styles.monthTitle}>
          {currentDate.toLocaleString("zh-TW", {
            year: "numeric",
            month: "long",
          })}
        </span>
        <button style={styles.navButton} onClick={() => handleMonthChange(1)}>
          &gt;
        </button>
      </div>

      {/* 星期標籤 */}
      <div style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} style={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* 日期格子 */}
      <div style={styles.daysGrid}>
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              ...styles.day,
              ...(day && highlightedDates.includes(day)
                ? styles.highlightedDay
                : {}),
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "10px 40px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  navButton: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "18px",
    cursor: "pointer",
  },
  monthTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: "10px",
    justifyItems: "center",
  },
  weekday: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
  },
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    justifyItems: "center",
  },
  day: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    fontSize: "14px",
  },
  highlightedDay: {
    backgroundColor: "#e0f7fa",
    color: "#000",
    fontWeight: "bold",
    background:
      "var(---Button-01, linear-gradient(81deg, #FBDBD6 10.58%, #D9DFF0 75.92%))",
  },
};
