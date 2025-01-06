import React, { useState } from "react";

const DAYS_OF_WEEK = ["日", "一", "二", "三", "四", "五", "六"];

export default function CustomCalendar({ startDate, endDate}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]); // 初始化為空陣列

  // 取得當月的所有天數
  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay(); // 月份第一天是星期幾
    const totalDays = new Date(year, month + 1, 0).getDate(); // 當月總天數
    // 新增一個函數來設定高亮日期
    const setHighlightedRange = (start, end) => {
        const range = [];
        for (let i = start; i <= end; i++) {
        range.push(i);
        }
        setHighlightedDates(range);
    };

    // 在這裡根據 startDate 和 endDate 設定高亮日期
    React.useEffect(() => {
        if (startDate instanceof Date && endDate instanceof Date) {
          const startDay = startDate.getDate();
          const endDay = endDate.getDate();
          setHighlightedRange(startDay, endDay);
        } else {
          setHighlightedDates([]); // 如果沒有範圍，清空高亮日期
        }
      }, [startDate, endDate]);

    // 前置空白（非當月日期）
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 當月日期
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  // 切換月份
  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div style={styles.container}>
      {/* 月份切換 */}
      <div style={styles.header}>
        <button style={styles.navButton} onClick={() => handleMonthChange(-1)}>
          &lt;
        </button>
        <span style={styles.monthTitle}>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
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
    width: "300px",
    padding: "20px",
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
    rowGap: "10px",
    justifyItems: "center",
  },
  weekday: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
    width:'24px',
    height:'24px'
  },
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    gridAutoRows: "1fr",
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
    lineHeight: "24px",
  },
  highlightedDay: {
    backgroundColor: "#e0f7fa",
    color: "#00796b",
    fontWeight: "bold",
  },
};
