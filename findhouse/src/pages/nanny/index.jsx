import React from 'react';
import { useRouter } from 'next/router';

const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/nanny/apply'); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>申請成為保母</h2>
        <button style={styles.closeButton}>X</button>
      </div>
      <div style={styles.content}>
        <div style={styles.subHeader}>
          <h3>托育平台合約</h3>
        </div>
        <div style={styles.textContent}>
          {/* 模拟的内容 */}
          <p style={styles.line}></p>
          <p style={styles.line}></p>
          <p style={styles.line}></p>
          <p style={styles.line}></p>
          <p style={styles.line}></p>
        </div>
        <div style={styles.checkboxContainer}>
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">我已閱讀並同意上述內容</label>
        </div>
        <button style={styles.nextButton} onClick={handleNextClick}>
          下一步
        </button>
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
  textContent: {
    maxHeight: '200px',
    overflowY: 'auto',
    marginBottom: '16px',
  },
  line: {
    backgroundColor: '#e0e0e0',
    height: '10px',
    marginBottom: '8px',
    borderRadius: '4px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  nextButton: {
    backgroundColor: '#ffad42',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
  },
};

export default ApplicationPage;
