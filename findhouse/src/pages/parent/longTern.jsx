import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function LongTermCarePage() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [date, setDate] = useState('');
  const [careType, setCareType] = useState('到宅托育');

  // Handle toggling the selected days
  const toggleDay = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next step
    router.push('/parent/longTernStep2');
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
        <h4>長期托育</h4>

        <form onSubmit={handleSubmit}>
          {/* Day Selection Switches */}
          <div className="daySelection">
            <label>選擇日期:</label>
            <div className="dayToggles">
              {Object.keys(selectedDays).map((day, index) => (
                <div key={index} className="dayToggle">
                  <span>{day === 'monday' ? '星期一' : 
                          day === 'tuesday' ? '星期二' : 
                          day === 'wednesday' ? '星期三' : 
                          day === 'thursday' ? '星期四' : 
                          day === 'friday' ? '星期五' : 
                          day === 'saturday' ? '星期六' : '星期日'}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={selectedDays[day]}
                      onChange={() => toggleDay(day)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div className="formGroup">
            <label htmlFor="date">選擇月份</label>
            <input
              type="month"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Care Type Dropdown */}
          <div className="formGroup">
            <label htmlFor="careType">選擇托育類型</label>
            <select
              id="careType"
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
            >
              <option value="到宅托育">到宅托育</option>
              <option value="定點托育">定點托育</option>
            </select>
          </div>


          {/* Submit Button */}
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

        .daySelection {
          margin-bottom: 20px;
        }

        .dayToggles {
          display: flex;
          flex-direction: column;
        }

        .dayToggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 12px;
          width: 12px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #d65b78;
        }

        input:checked + .slider:before {
          transform: translateX(14px);
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
