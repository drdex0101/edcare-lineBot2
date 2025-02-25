import React, { useState } from "react";
import { useRouter } from "next/router";

export default function CareListPage() {
  const router = useRouter();
  // Example data for the care records
  const careData = [
    {
      name: "王保母",
      experience: "6年 3月 托育經驗",
      rating: 4.8,
      imgSrc: "/assets/images/resource/error.png",
    },
    {
      name: "王保母",
      experience: "6年 3月 托育經驗",
      rating: 4.8,
      imgSrc: "/assets/images/resource/error.png",
    },
    {
      name: "王保母",
      experience: "6年 3月 托育經驗",
      rating: 4.8,
      imgSrc: "/assets/images/resource/error.png",
    },
    {
      name: "王保母",
      experience: "6年 3月 托育經驗",
      rating: 4.8,
      imgSrc: "/assets/images/resource/error.png",
    },
    {
      name: "王保母",
      experience: "6年 3月 托育經驗",
      rating: 4.8,
      imgSrc: "/assets/images/resource/error.png",
    },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next step
    router.push("/parent/longTernStep2");
  };

  return (
    <div className="container">
      {/* 標題和建立按鈕 */}
      <h1>托育資料填寫</h1>
      <style jsx>{`
        .container {
          background-color: #fceff1;
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          font-size: 18px;
          color: #d65b78;
        }

        .subTitle {
          font-size:;
        }
      `}</style>
    </div>
  );
}
