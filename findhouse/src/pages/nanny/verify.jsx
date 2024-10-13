import React, { useState } from 'react';
import { useRouter } from 'next/router';

const PhoneVerificationPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCodeChange = (e, index) => {
    const newCode = [...verificationCode];
    newCode[index] = e.target.value;
    setVerificationCode(newCode);

    // 自动焦点移动到下一个输入框
    if (e.target.value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
    setTimeLeft(120);

    // 模拟发送验证码，开始倒计时
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    handleSendCode();
  };

  const handleNextClick = () => {
    // 这里可以添加验证码验证逻辑
    router.push('/nanny/finish'); // 替换为实际的下一步路径
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>申請成為保母</h2>
        <button style={styles.closeButton}>X</button>
      </div>
      <div style={styles.content}>
        <div style={styles.subHeader}>
          <h3>手機認證</h3>
        </div>
        <div style={styles.instructions}>
          請輸入常用手機進行認證
        </div>
        <input
          type="tel"
          placeholder="請輸入手機號碼"
          value={phoneNumber}
          onChange={handlePhoneChange}
          style={styles.input}
          disabled={isCodeSent}
        />
        {isCodeSent && (
          <div>
            <div style={styles.instructions}>請輸入6位驗證碼</div>
            <div style={styles.codeInputContainer}>
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  id={`code-${index}`}
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  style={styles.codeInput}
                />
              ))}
            </div>
            <div style={styles.timer}>
              等待{timeLeft}秒重新寄送
            </div>
            {timeLeft === 0 && (
              <button style={styles.resendButton} onClick={handleResendCode}>
                重新寄送
              </button>
            )}
          </div>
        )}
        {!isCodeSent && (
          <button style={styles.sendButton} onClick={handleSendCode}>
            發送驗證碼
          </button>
        )}
        <div style={styles.buttonGroup}>
          <button style={styles.backButton} onClick={() => router.back()}>
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
  instructions: {
    fontSize: '14px',
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '16px',
    width: '100%',
  },
  codeInputContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  codeInput: {
    width: '40px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '18px',
  },
  timer: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
  },
  resendButton: {
    backgroundColor: '#ffad42',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  sendButton: {
    backgroundColor: '#ffad42',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '16px',
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

export default PhoneVerificationPage;
