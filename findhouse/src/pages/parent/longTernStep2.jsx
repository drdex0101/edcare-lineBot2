import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function CareFormPage() {
  const router = useRouter();

  // State for form data
  const [childName, setChildName] = useState('');
  const [gender, setGender] = useState('女');
  const [dob, setDob] = useState('');
  const [birthOrder, setBirthOrder] = useState('第一胎');
  const [preferences, setPreferences] = useState({
    allowFriends: false,
    cleanToys: false,
    makeFood: false,
    checkGrowth: false,
    no3C: false,
    familyOuting: false,
  });
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Handle toggling preferences
  const togglePreference = (key) => {
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation or data submission logic here
    console.log({
      childName,
      gender,
      dob,
      birthOrder,
      preferences,
      additionalNotes,
    });
    router.push('/parent/nextstep'); // Navigate to the next page
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
        <h4>托育基本資料</h4>

        <form onSubmit={handleSubmit}>
          {/* Child's Name */}
          <div className="formGroup">
            <label htmlFor="childName">孩童暱稱</label>
            <input
              type="text"
              id="childName"
              placeholder="請輸入孩子的暱稱"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </div>

          {/* Gender Selection */}
          <div className="formGroup">
            <label htmlFor="gender">性別</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="女">女</option>
              <option value="男">男</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="formGroup">
            <label htmlFor="dob">出生日期</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Birth Order */}
          <div className="formGroup">
            <label htmlFor="birthOrder">胎別</label>
            <select
              id="birthOrder"
              value={birthOrder}
              onChange={(e) => setBirthOrder(e.target.value)}
            >
              <option value="第一胎">第一胎</option>
              <option value="第二胎">第二胎</option>
              <option value="第三胎">第三胎</option>
            </select>
          </div>

          {/* Care Preferences (Toggle Switches) */}
          <div className="carePreferences">
            <label>托育需求選擇</label>
            <div className="preferencesList">
              <div className="preferenceItem">
                <span>可接送小朋友</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.allowFriends}
                    onChange={() => togglePreference('allowFriends')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="preferenceItem">
                <span>寶寶衣物清洗</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.cleanToys}
                    onChange={() => togglePreference('cleanToys')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="preferenceItem">
                <span>製作副食品</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.makeFood}
                    onChange={() => togglePreference('makeFood')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="preferenceItem">
                <span>可隨端查看育兒情形</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.checkGrowth}
                    onChange={() => togglePreference('checkGrowth')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="preferenceItem">
                <span>可配合不使用3C育兒</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.no3C}
                    onChange={() => togglePreference('no3C')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="preferenceItem">
                <span>可配合家長外出</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.familyOuting}
                    onChange={() => togglePreference('familyOuting')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="formGroup">
            <label htmlFor="notes">托育理念</label>
            <textarea
              id="notes"
              placeholder="請輸入托育理念"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submitButton">
            確認送出 →
          </button>
        </form>
      </div>

      <style jsx>{`
        .container {
          background-color: #fceff1;
          padding: 20px;
          height: 100%;
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
          width: 100%;
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
        .formGroup select,
        .formGroup textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
        }

        .carePreferences {
          margin-bottom: 20px;
        }

        .preferencesList {
          display: flex;
          flex-direction: column;
        }

        .preferenceItem {
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
          .formGroup select,
          .formGroup textarea {
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
