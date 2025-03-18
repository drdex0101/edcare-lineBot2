import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id, orderId, status } = req.body; // id 為保母id

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    // 創建 PostgreSQL 客戶端
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false, // 如果你在 Vercel 上運行，通常需要這個設定
      },
    });

    try {
      // 連接資料庫
      await client.connect();

      const memberQuery = `
        SELECT * FROM member
        WHERE line_id = $1
      `;
      const memberValues = [userId];
      const memberResult = await client.query(memberQuery, memberValues);
      console.log('memberResult', memberResult.rows);

      const nannyQuery = `
        SELECT * FROM nanny
        WHERE memberid = $1
      `;
      const nannyValues = [memberResult.rows[0].id];
      const nannyResult = await client.query(nannyQuery, nannyValues);
      console.log('nannyResult', nannyResult.rows[0].id);

      // 使用參數化查詢更新資料
      const query = `
        UPDATE orderinfo
        SET nannyid = $1,
            status = $3,
            update_ts = NOW()
        WHERE id = $2
        RETURNING *;
      `;
      const values = [nannyResult.rows[0].id, id, status];

      const result = await client.query(query, values);
      return res.status(201).json({ success: true, member: result.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // 關閉連接
      await client.end();
    }
  } else {
    // 不支援的 HTTP 方法
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
