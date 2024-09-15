import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
  const router = useRouter();
  const { code, state } = router.query;

  useEffect(() => {
    if (code && state) {
      const saveCodeAndState = async () => {
        try {
          // 將 code 和 state 存入資料庫
          await axios.post('/api/save-code-state', {
            code: code,
            state: state,
          });

          // 存儲完成後重定向到新的頁面
          router.push('/success'); // 重定向到成功頁面
        } catch (error) {
          console.error('Error saving code and state:', error);
        }
      };

      saveCodeAndState();
    }
  }, [code, state, router]);

  return <div>處理回調並儲存資料中...</div>;
}
