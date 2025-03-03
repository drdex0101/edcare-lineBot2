import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const {itemId, type } = req.query;

    // 創建 PostgreSQL 客戶端
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false, // 如果你在 Vercel 上運行，通常需要這個設定
      },
    });

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    console.log('userId', userId);
    try {
      // 連接資料庫
      await client.connect();

      // 使用參數化查詢插入資料
      const query = `
        SELECT * FROM favorites WHERE user_id = $1 AND item_id = CAST($2 AS VARCHAR) AND type = $3
      `;

      const values = [
        userId, 
        itemId, 
        type
      ];
      const result = await client.query(query, values);

      console.log('favorite created successfully:',  values );
      const favoriteData = result.rows.length > 0 ? result.rows[0] : []; // 若無結果則回傳 []

      return res.status(201).json({ success: true, favorite: favoriteData });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // 關閉連接
      await client.end();
    }
  } else {
    // 不支援的 HTTP 方法
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
