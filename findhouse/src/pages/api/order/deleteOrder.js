import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    console.log('req.body', req.body);
    const { orderId } = req.body;

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();
      await client.query('BEGIN'); // ⛓ 開始交易

      // 1. 刪除 pair table 裡面符合 orderId 的資料
      const deletePairQuery = `DELETE FROM pair WHERE order_id = $1`;
      await client.query(deletePairQuery, [orderId]);

      // 2. 刪除 orders table 裡面的資料
      const deleteOrderQuery = `DELETE FROM orderInfo WHERE id = $1 RETURNING *`;
      const result = await client.query(deleteOrderQuery, [orderId]);

      await client.query('COMMIT'); // ✅ 提交交易

      console.log('order deleted successfully:', result.rows[0]);
      return res.status(200).json({ success: true, order: result.rows[0] });

    } catch (error) {
      await client.query('ROLLBACK'); // ❌ 發生錯誤時回滾
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
