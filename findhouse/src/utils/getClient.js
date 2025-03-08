import { Pool } from 'pg';

export default function getClient() {
  return new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000, // 連線逾時設定為5秒
    idleTimeoutMillis: 30000,      // 閒置逾時設定為30秒
    statement_timeout: 10000, // 查詢逾時設定為10秒
    max: 100, // 設定連線池的最大連線數為 20
  });
}