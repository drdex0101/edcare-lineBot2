import { Pool } from 'pg';
import net from 'net';

// 修正 Node.js v20 可能導致的 Socket 連線超時問題
if (net.setDefaultAutoSelectFamily) {
  net.setDefaultAutoSelectFamily(false);
}

// 使用單例模式，確保 `pool` 只建立一次
let pool;

export default function getClient() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000, // 連線超時 10 秒
      idleTimeoutMillis: 30000, // 閒置連線超時 30 秒
      statement_timeout: 15000, // 查詢超時 15 秒
      max: 50, // 最大連線數
    });

    pool.on('error', (err) => {
      console.error('資料庫連線池發生錯誤:', err);
    });
  }
  
  return pool;
}
