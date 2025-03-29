import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, orderId, status } = req.body; // orderId 為訂單ID

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    let nannyId = 0;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // 查詢目前使用者的 nannyId（如果 id === 0）
      if (id === 0) {
        const memberQuery = `SELECT id FROM member WHERE line_id = $1`;
        const memberResult = await client.query(memberQuery, [userId]);

        if (memberResult.rows.length === 0) {
          return res.status(404).json({ error: 'Member not found' });
        }

        const memberId = memberResult.rows[0].id;
        const nannyQuery = `SELECT id FROM nanny WHERE memberid = $1`;
        const nannyResult = await client.query(nannyQuery, [memberId]);

        if (nannyResult.rows.length === 0) {
          return res.status(404).json({ error: 'Nanny not found' });
        }

        nannyId = nannyResult.rows[0].id;
      } else {
        nannyId = id;
      }

      // ✅ 檢查是否已存在這筆配對紀錄
      const checkQuery = `
        SELECT * FROM pair 
        WHERE nanny_id = $1 AND order_id = $2 AND status = $3
      `;
      const checkResult = await client.query(checkQuery, [nannyId, orderId, status]);

      if (checkResult.rows.length > 0) {
        return res.status(400).json({ success: false, message: '已經建立配對，請選擇另一位' });
      }

      // ✅ 插入新配對
      const insertPairQuery = `
        INSERT INTO pair (nanny_id, order_id, status)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const pairResult = await client.query(insertPairQuery, [nannyId, orderId, status]);

      return res.status(201).json({ success: true, pair: pairResult.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
