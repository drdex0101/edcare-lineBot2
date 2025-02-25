import React, { useState, useEffect } from "react";
import "./css/Loading.css";

const LoadingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const renderSvg = (index) => {
    switch (index) {
      case 0:
        return (
          <>
            <circle
              cx="24.5"
              cy="24"
              r="4"
              stroke="#252525"
              strokeWidth="6"
              fill="none"
            />
          </>
        );
      case 1:
        return (
          <>
            <circle
              cx="24.5"
              cy="24"
              r="4"
              stroke="#252525"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="12"
              stroke="#252525"
              strokeWidth="4"
              opacity="0.6"
              fill="none"
            />
          </>
        );
      case 2:
        return (
          <>
            <circle
              cx="24.5"
              cy="24"
              r="4"
              stroke="#252525"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="12"
              stroke="#252525"
              strokeWidth="4"
              opacity="0.6"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="20"
              stroke="#252525"
              strokeWidth="2"
              opacity="0.3"
              fill="none"
            />
          </>
        );
      default:
        return (
          <>
            <circle
              cx="24.5"
              cy="24"
              r="4"
              stroke="#252525"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="12"
              stroke="#252525"
              strokeWidth="4"
              opacity="0.6"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="20"
              stroke="#252525"
              strokeWidth="2"
              opacity="0.3"
              fill="none"
            />
            <circle
              cx="24.5"
              cy="24"
              r="28"
              stroke="#252525"
              strokeWidth="1"
              opacity="0.1"
              fill="none"
            />
          </>
        );
    }
  };

  return (
    <div className="loading-container">
      <div className="loading-item">
        <svg
          className="rotating-svg"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Pulse/Spinner-Pulse-2">{renderSvg(currentIndex)}</g>
        </svg>
        <span className="loading-text">載入中...</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
