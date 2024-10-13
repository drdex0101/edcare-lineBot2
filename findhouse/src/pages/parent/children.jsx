import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const router = useRouter(); // To handle navigation to the next step
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [careType, setCareType] = useState('臨時托育');
  const [center, setCenter] = useState('露梅托私立童心托嬰中心');

  // Function to handle form submission and navigate to next step
  const handleNextStep = (e) => {
    e.preventDefault();
    router.push('/parent/confirmation'); // Update with the next page's route
  };

  return (
    <div className="container">
      <div className="header">
        <div className="titleBar">
          <h2>申請成為家長</h2>
        </div>
        <div className="progress">
          <div className="progressBar"></div>
        </div>
      </div>

      <div className="formSection">
        <h3 className="formTitle">托育資料填寫</h3>
        <h4>臨時托育</h4>
        <p>請輸入日期區間</p>

        <form onSubmit={handleNextStep}>
          <div className="formGroup">
            <label htmlFor="startDate">開始日期</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="endDate">結束日期</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="careType">選擇托育類型</label>
            <select
              id="careType"
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
            >
              <option value="臨時托育">臨時托育</option>
              <option value="定點托育">定點托育</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="center">選擇托育中心</label>
            <select
              id="center"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
            >
              <option value="露梅托私立童心托嬰中心">
                露梅托私立童心托嬰中心 - 台北市文山區
              </option>
              <option value="其他中心">其他中心</option>
            </select>
            <p>托育人數：5人 / 剩餘名額：23人</p>
          </div>

          <button type="submit" className="submitButton">
            下一步 →
          </button>
        </form>
      </div>

      <style jsx>{`
        .container {
          background-color: #fceff1;
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          text-align: center;
          background-color: #fff;
        }

        .titleBar h2 {
          color: #d65b78;
          margin-bottom: 10px;
        }

        .progress {
          width: 100%;
          height: 4px;
          background-color: #ffd1e1;
          margin-bottom: 20px;
        }

        .progressBar {
          width: 90%; /* Adjusted to reflect the next stage */
          height: 100%;
          background-color: #d65b78;
        }

        .formSection {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .formTitle {
          color: #d65b78;
          margin-bottom: 20px;
        }

        .formGroup {
          margin-bottom: 20px;
          width: 100%;
        }

        .formGroup label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .formGroup input,
        .formGroup select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
        }

        .submitButton {
          width: 100%;
          padding: 15px;
          background-color: #d65b78;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .submitButton:hover {
          background-color: #c04f6b;
        }

        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }

          .formGroup input,
          .formGroup select {
            font-size: 14px;
          }

          .submitButton {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
