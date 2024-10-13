import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CaregiverUploadPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    certificateNumber: '',
    issuedDate: '',
    uploadPhoto: null,
    educationProof: null,
    serviceProof: null,
    selectedBackground: '中華民國保母證照',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleNextClick = () => {
    // 这里可以添加表单验证逻辑
    router.push('/nanny/verify'); // 替换为实际的下一步路径
  };

  const handleBackClick = () => {
    router.back(); // 返回到上一页
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>申請成為保母</h2>
        <button style={styles.closeButton}>X</button>
      </div>
      <div style={styles.content}>
        <div style={styles.subHeader}>
          <h3>保母資料上傳</h3>
        </div>
        <form style={styles.form}>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>* 專業背景（可複選）</legend>
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="selectedBackground"
                  value="中華民國保母證照"
                  checked={formData.selectedBackground === '中華民國保母證照'}
                  onChange={handleChange}
                />
                中華民國保母證照
              </label>
            </div>
            {formData.selectedBackground === '中華民國保母證照' && (
              <div style={styles.certificateDetails}>
                <label style={styles.label}>
                  技術士證照號碼：
                  <input
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleChange}
                    placeholder="123456789"
                    style={styles.input}
                  />
                </label>
                <label style={styles.label}>
                  核發日期：
                  <input
                    type="date"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </label>
                <label style={styles.label}>
                  上傳照片：
                  <input
                    type="file"
                    name="uploadPhoto"
                    onChange={handleFileChange}
                    style={styles.input}
                  />
                </label>
              </div>
            )}
          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>學歷證明</legend>
            <label style={styles.label}>
              <input
                type="radio"
                name="educationProofType"
                value="學歷證明"
                onChange={handleChange}
              />
              學歷證明
            </label>
            <label style={styles.label}>
              <input
                type="radio"
                name="educationProofType"
                value="托育人員專業訓練結業"
                onChange={handleChange}
              />
              托育人員專業訓練結業
            </label>
          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>居家式托育服務登記書</legend>
            <label style={styles.label}>
              上傳居家式托育服務登記書：
              <input
                type="file"
                name="serviceProof"
                onChange={handleFileChange}
                style={styles.input}
              />
            </label>
          </fieldset>
        </form>
        <div style={styles.buttonGroup}>
          <button style={styles.backButton} onClick={handleBackClick}>
            上一步
          </button>
          <button style={styles.nextButton} onClick={handleNextClick}>
            下一步
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '375px',
    backgroundColor: '#fff4e6',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    margin: 'auto',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
  },
  subHeader: {
    borderBottom: '2px solid #81c784',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
  },
  fieldset: {
    border: 'none',
    padding: '0',
    marginBottom: '16px',
  },
  legend: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '4px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  nextButton: {
    backgroundColor: '#ffad42',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default CaregiverUploadPage;
