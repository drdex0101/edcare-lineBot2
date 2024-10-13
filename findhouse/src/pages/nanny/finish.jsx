import React from 'react';
import { useRouter } from 'next/router';

const CompletionPage = () => {
  const router = useRouter();

  const handleCloseClick = () => {
    router.push('/'); // 返回到主页或其他指定页面
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>申請成為保母</h2>
        <button style={styles.closeButton} onClick={handleCloseClick}>X</button>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>恭喜完成註冊</h3>
        <div style={styles.imageContainer}>
          {/* 使用实际图片时，替换 src 属性 */}
          <img src="/images/success-icon.png" alt="Success" style={styles.image} />
        </div>
        <p style={styles.message}>稽等系統人員審核</p>
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
    textAlign: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#e0f7fa',
  },
  message: {
    fontSize: '14px',
    color: '#333',
  },
};

export default CompletionPage;
