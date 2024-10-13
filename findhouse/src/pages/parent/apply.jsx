import React from 'react';
import { useRouter } from 'next/router';  // Import useRouter
export default function FormPage() {
  const router = useRouter(); 
  const handleSubmit = (e) => {
    e.preventDefault();  
    router.push('/parent/upload');
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

      <div className="formSection" onSubmit={handleSubmit}>
        <h3 className="formTitle">會員資料填寫</h3>

        <form className="form">
          <div className="formGroup">
            <label htmlFor="name">帳號姓名</label>
            <input id="name" type="text" placeholder="王美麗" />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">常用電話</label>
            <input id="phone" type="text" placeholder="0912-345-678" />
          </div>

          <div className="formGroup">
            <label htmlFor="job">職 業</label>
            <input id="job" type="text" placeholder="請輸入職業類別" />
          </div>

          <div className="formGroup">
            <label htmlFor="email">聯絡信箱</label>
            <input id="email" type="email" placeholder="user@mail.com" />
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
          color: #E3838E;
          margin-bottom: 10px;
        }

        .progress {
          width: 100%;
          height: 4px;
          background-color: #fff;
          margin-bottom: 20px;
        }

        .progressBar {
          width: 50%;
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

        .form {
          width: 100%;
        }

        .formGroup {
          margin-bottom: 20px;
        }

        .formGroup label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .formGroup input {
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

          .formGroup input {
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
