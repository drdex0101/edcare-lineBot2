import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';
import useStore from '../../../lib/store';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    const { accountName, cellphone, email, job } = req.body;
    // 創建 PostgreSQL 客戶端
    const client = getClient();

    try {
      // 連接資料庫
      await client.connect();

      // 使用參數化查詢插入資料
      const query = `
        INSERT INTO member (account, line_id, cellphone, email, job, created_ts)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *;
      `;
      console.log(query);
      const values = [accountName, userId, cellphone, email, job];
      const result = await client.query(query, values);

      console.log('Member created successfully:', result.rows[0]);
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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
