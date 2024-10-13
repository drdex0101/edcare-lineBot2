import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CaregiverFormPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    gender: '',
    birthDate: '',
    address: '',
    contactAddress: '',
    phone: '',
    email: '',
    idUpload: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      idUpload: e.target.files[0],
    });
  };

  const handleNextClick = () => {
    // 这里可以添加表单验证逻辑
    router.push('/parent/upload'); // 替换为实际的下一步路径
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
          <h3>建立孩童資料</h3>
        </div>
        <form style={styles.form}>
          <label style={styles.label}>
            * 暱稱
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="請輸入真實姓名"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 身分字號
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="身分證字號"
              style={styles.input}
            />
          </label>
          <div style={styles.radioGroup}>
            <span>* 性別</span>
            <label>
              <input
                type="radio"
                name="gender"
                value="男"
                onChange={handleChange}
                checked={formData.gender === '男'}
              />
              男
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="女"
                onChange={handleChange}
                checked={formData.gender === '女'}
              />
              女
            </label>
          </div>
          <label style={styles.label}>
            * 出生日期
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 戶籍地址
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="戶籍地址"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 通訊地址
            <input
              type="text"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
              placeholder="通訊地址"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 聯繫電話
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="聯繫電話或手機號碼"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 聯絡信箱
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="電子信箱"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            * 上傳身分證正反面
            <input
              type="file"
              onChange={handleFileChange}
              style={styles.input}
            />
          </label>
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
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '4px',
  },
  radioGroup: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
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

export default CaregiverFormPage;
