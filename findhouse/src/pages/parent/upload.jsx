import React from 'react';
import { useRouter } from 'next/router';  // Import useRouter
export default function FormPage() {
  const router = useRouter(); 
  const handleSubmit = (e) => {
    e.preventDefault();  
    router.push('/parent/longTern');
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
        <h3 className="formTitle">身份驗證</h3>

        <form className="form">
          {/* Existing fields */}
          <div className="formGroup">
            <label htmlFor="name">真實姓名</label>
            <input id="name" type="text" placeholder="王美麗" />
          </div>

          <div className="formGroup">
            <label htmlFor="id">身份字號</label>
            <input id="id" type="text" placeholder="A123456789" />
          </div>

          <div className="formGroup">
            <label htmlFor="gender">性 別</label>
            <select id="gender">
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="dob">出生日期</label>
            <input id="dob" type="date" />
          </div>

          <div className="formGroup">
            <label htmlFor="address">戶籍地址</label>
            <input id="address" type="text" placeholder="請輸入您的戶籍地址" />
          </div>

          <div className="formGroup">
            <label htmlFor="contactAddress">聯絡地址</label>
            <input id="contactAddress" type="text" placeholder="請輸入您的聯絡地址" />
          </div>

          {/* File upload section */}
          <div className="fileUploadSection">
            <label className="fileLabel">上傳您的證件正反面照片</label>
            <p>請上傳以下格式的圖片：JPG, PNG, 最大 2 MB</p>

            <div className="fileUploadWrapper">
              {/* 示意圖? */}
              <button type="button" className="uploadButton">上傳照片</button>
              <input type="file" id="file" className="fileInput" />
            </div>

          </div>

          <div className="fileUploadSection">
            <label className="fileLabel">上傳其他資料</label>
            <div className="fileUploadWrapper">
              <button type="button" className="uploadButton">上傳檔案</button>
              <input type="file" className="fileInput" />
            </div>
          </div>

          <button type="submit" className="submitButton">確認送出</button>
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
          width: 75%; /* Adjusted to reflect further progress */
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

        .formGroup input,
        .formGroup select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
        }

        .fileUploadSection {
          margin-bottom: 20px;
        }

        .fileLabel {
          font-size: 14px;
          margin-bottom: 5px;
        }

        .fileUploadWrapper {
          display: flex;
          align-items: center;
        }

        .filePlaceholder img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
          margin-right: 10px;
        }

        .uploadButton {
          padding: 10px 15px;
          background-color: #d65b78;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .uploadButton:hover {
          background-color: #c04f6b;
        }

        .fileInput {
          display: none;
        }

        .uploadedFile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }

        .deleteButton {
          background-color: transparent;
          color: #d65b78;
          border: none;
          cursor: pointer;
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
